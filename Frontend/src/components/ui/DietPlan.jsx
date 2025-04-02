import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../../config/axios';
import { useAuth } from '../../context/AuthContext';

const DietPlan = () => {
  const { user } = useAuth();
  const [trimester, setTrimester] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [allergies, setAllergies] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const prompt = `Generate a personalized diet plan for a pregnant woman in her ${trimester} trimester. 
        Dietary preferences: ${dietaryPreference}. 
        Allergies: ${allergies || 'None'}.
        Please include daily meal suggestions and important nutrients to focus on.`;

      const res = await axios.post('/user/acceptPromptAndGenerateRecipies', {
        prompt: prompt
      });

      setRecommendations(res.data.data);
    } catch (err) {
      setError('Failed to get diet recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Personalized Diet Plan</h1>
            <p className="mt-2 text-purple-100">
              Get customized nutrition recommendations based on your trimester and dietary needs
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Trimester
                  </label>
                  <select
                    value={trimester}
                    onChange={(e) => setTrimester(e.target.value)}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select Trimester</option>
                    <option value="first">First Trimester</option>
                    <option value="second">Second Trimester</option>
                    <option value="third">Third Trimester</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dietary Preference
                  </label>
                  <select
                    value={dietaryPreference}
                    onChange={(e) => setDietaryPreference(e.target.value)}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select Preference</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allergies or Restrictions (Optional)
                </label>
                <textarea
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="List any food allergies or dietary restrictions..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                  ${loading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
              >
                {loading ? 'Generating Plan...' : 'Get Diet Plan'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {recommendations && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-purple-50 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-purple-900 mb-4">
                  Your Personalized Diet Plan
                </h2>
                <div className="prose prose-purple max-w-none">
                  <div className="whitespace-pre-line text-gray-700">
                    {recommendations}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Nutrition Tips */}
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Nutrition Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-purple-600">Essential Nutrients</h4>
                <p className="mt-1 text-sm text-gray-600">Focus on folate, iron, calcium, and protein</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-purple-600">Meal Frequency</h4>
                <p className="mt-1 text-sm text-gray-600">Eat small, frequent meals throughout the day</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-purple-600">Hydration</h4>
                <p className="mt-1 text-sm text-gray-600">Drink at least 8-10 glasses of water daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;
