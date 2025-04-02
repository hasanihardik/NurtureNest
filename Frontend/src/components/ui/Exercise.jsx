import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { motion, AnimatePresence } from 'framer-motion';

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trimester, setTrimester] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const res = await axios.get('/exercise/fetchAllExercise');
      setExercises(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch exercises. Please try again later.');
      setLoading(false);
    }
  };

  const getAiRecommendations = async () => {
    if (!trimester) {
      alert('Please select your trimester first');
      return;
    }

    setAiLoading(true);
    try {
      const res = await axios.post('/user/acceptPromptAndGenerateRecipies', {
        trimester: trimester
      });
      setAiRecommendations(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Failed to get AI recommendations');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Safe Pregnancy Exercises
          </h1>
          
          {/* AI Recommendations Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Get Personalized Exercise Recommendations
            </h2>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Trimester
                </label>
                <select
                  value={trimester}
                  onChange={(e) => setTrimester(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select Trimester</option>
                  <option value="first">First Trimester</option>
                  <option value="second">Second Trimester</option>
                  <option value="third">Third Trimester</option>
                </select>
              </div>
              <button
                onClick={getAiRecommendations}
                disabled={aiLoading}
                className={`px-6 py-2 rounded-md text-white font-medium
                  ${aiLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'}
                  transition-colors duration-200`}
              >
                {aiLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
              </button>
            </div>

            {aiRecommendations && (
              <div className="mt-6 p-4 bg-purple-50 rounded-md">
                <h3 className="text-lg font-medium text-purple-900 mb-2">
                  AI Recommendations:
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {aiRecommendations}
                </p>
              </div>
            )}
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exercises.map((exercise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => {
                  setSelectedExercise(exercise);
                  setIsModalOpen(true);
                }}
                className="group bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative">
                  <img
                    src={exercise.url}
                    alt={exercise.name}
                    className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {exercise.name}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Exercise Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedExercise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl"
              >
                <div className="relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={selectedExercise.url}
                        alt={selectedExercise.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedExercise.name}</h3>
                      
                      <div className="prose prose-purple">
                        <p className="text-gray-600">{selectedExercise.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-purple-600 font-medium">Repetitions</p>
                          <p className="text-2xl font-bold text-purple-700">{selectedExercise.repetition}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-purple-600 font-medium">Sets</p>
                          <p className="text-2xl font-bold text-purple-700">{selectedExercise.sets}</p>
                        </div>
                      </div>

                      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          ⚠️ Always consult with your healthcare provider before starting any exercise routine during pregnancy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Exercise;
