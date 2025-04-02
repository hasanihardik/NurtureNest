import {User} from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.util.js'
import {ApiError} from '../utils/ApiError.util.js'
import {uploadOnCloudinary as cloudinary,deleteFromCloudinary} from '../utils/clodinary.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import jwt from 'jsonwebtoken'
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios'

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
}

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,'something went wrong while generating refresh and access token ')
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    const {email,username,age,weight,height,password,allergies} = req.body

    if(!email || !username || !age || !weight || !height || !password) {
        throw new ApiError(400,"All fields are required")
    }

    const prevUser = await User.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(prevUser){
        throw new ApiError(400,'User already exists. Please use different credentials')
    }

    let avatar;
    const avatarLocPath = req.file?.path;
    if(avatarLocPath) {
        avatar = await cloudinary(avatarLocPath);
        if(!avatar) {
            throw new ApiError(400,'Error uploading image to cloudinary')
        }
    }

    const newUser = await User.create({
        email,
        username: username.toLowerCase(),
        password,
        age,
        weight,
        height,
        avatar: avatar?.url,
        allergies: allergies || []
    })

    if(!newUser){
        throw new ApiError(500,'Error in creation of new user')
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(newUser._id)
    const user = await User.findById(newUser._id).select("-password -refreshToken")
    
    if(!user){
        throw new ApiError(500,'Something went wrong')
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                   accessToken,
                   refreshToken,
                },
                "User registered successfully"
            )
        )
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) {
        throw new ApiError(400,'Email and password are required')
    }

    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(400,'User with this email does not exist')
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(400,'Invalid password')
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedUser = await User.findById(user._id).select('-password -refreshToken')

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        )
})

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {new: true}
    )

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){ 
        throw new ApiError(401, "Unauthorized request - no refresh token")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, 'Invalid refresh token')
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, 'Refresh token is expired or used')
        }

        const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", newRefreshToken, cookieOptions)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid refresh token')
    }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    
    if(!isPasswordCorrect){
        throw new ApiError(400, "Current password is incorrect")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})
    
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"))
})

const getUser = asyncHandler(async(req,res)=>{
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"))
})

const updateAccountDetailsTextBased = asyncHandler(async(req,res)=>{
    const {weight, age, height} = req.body
    
    if(!weight && !age && !height) {
        throw new ApiError(400, "At least one field is required for update")
    }

    const updateFields = {}
    if(weight) updateFields.weight = weight
    if(age) updateFields.age = age
    if(height) updateFields.height = height

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { 
            $set: updateFields
        },
        {new: true}
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req,res)=>{
    const avatarLocPath = req.file?.path
    if(!avatarLocPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await cloudinary(avatarLocPath)
    if(!avatar?.url){
        throw new ApiError(400, "Error uploading image to cloudinary")
    }

    await deleteFromCloudinary(avatarLocPath)

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                avatar: avatar.url 
            },
        },
        {new: true}
    ).select('-password')

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully"))
})

const acceptAllergiesAndMedicalCondition = asyncHandler(async (req, res) => {
    const { allergies } = req.body;

    if (!allergies || typeof allergies !== 'string') {
        throw new ApiError(400, "Invalid input. Allergies must be a non-empty string");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { allergies: allergies } },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, 'Allergy added successfully'));
});

const acceptPromptAndGenerateRecipies = asyncHandler(async(req,res)=>{
    if(!process.env.GEMINI_API_KEY) {
        throw new ApiError(500, "Gemini API key not configured")
    }

    if(!req.user){
        throw new ApiError(401, 'User must be logged in')
    }

    const {trimester} = req.body;
    let prompt = 'I want curated and healthy diet plan';
    const allergies = req.user.allergies;

    if(allergies.length > 0) {
        prompt += " taking into account the following allergies: " + allergies.join(", ")
    }
    
    if(trimester){
        prompt += ` I am in ${trimester} trimester of pregnancy`
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text()
        return res
            .status(200)
            .json(new ApiResponse(200, response, "Diet plan generated successfully"))
    } catch (error) {
        throw new ApiError(500, error.message || "Error generating diet plan")   
    }
})

const getClosestHospitals = asyncHandler(async(req,res)=>{
    if(!process.env.GO_MAP_API_KEY) {
        throw new ApiError(500, "Maps API key not configured")
    }

    const {address} = req.body;
    if(!address){
        throw new ApiError(400, "Address is required")
    }

    try {
        const apiUrl = `https://maps.gomaps.pro/maps/api/geocode/json?key=${process.env.GO_MAP_API_KEY}&address=${encodeURIComponent(address)}`;
        const result = await axios.get(apiUrl);
        
        if (result.data.status !== "OK") {
            throw new ApiError(400, 'Error fetching location data');
        }
        
        const location = result.data.results[0]?.geometry?.location;
        if(!location?.lat || !location?.lng) {
            throw new ApiError(400, 'Could not determine location coordinates');
        }

        let rad = 3000;
        let response;
        let attempts = 0;
        const maxAttempts = 5;

        do {
            const url = `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&name=maternalhospital&key=${process.env.GO_MAP_API_KEY}&radius=${rad}`;
            response = await axios.get(url);
            
            if(response.data.results.length > 0) break;
            
            rad += 1500;
            attempts++;
        } while(attempts < maxAttempts);

        if(!response?.data?.results?.length){
            return res
                .status(200)
                .json(new ApiResponse(200, [], 'No hospitals found in the area'))
        }

        const hospitals = response.data.results.map(hospital => ({
            name: hospital.name || "Unknown",
            rating: hospital.rating || "No rating",
            latitude: hospital.geometry.location.lat,
            longitude: hospital.geometry.location.lng,
            address: hospital.vicinity || "No address"
        }));

        return res
            .status(200)
            .json(new ApiResponse(200, hospitals, 'Hospitals fetched successfully'))
    } catch (error) {
        throw new ApiError(500, error.message || "Error fetching hospitals")
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getUser,
    updateUserAvatar,
    updateAccountDetailsTextBased,
    acceptAllergiesAndMedicalCondition,
    acceptPromptAndGenerateRecipies,
    getClosestHospitals
};
