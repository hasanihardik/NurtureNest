import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from '../../config/axios';

const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [trimester, setTrimester] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const suggestions = [
    "What foods should I avoid during pregnancy?",
    "Safe exercises for my trimester",
    "Managing morning sickness",
    "Essential nutrients for pregnancy",
    "Sleep tips during pregnancy"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/user/acceptPromptAndGenerateRecipies', {
        prompt: query,
        trimester: trimester
      });
      setResponse(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Pregnancy Assistant
          </h1>
          <p className="text-gray-600 mb-6">
            Get instant answers to your pregnancy-related questions from our AI assistant.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Trimester (Optional)
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Ask anything about pregnancy..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading || !query.trim() ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
            >
              {loading ? 'Getting Answer...' : 'Ask Question'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          {response && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-6 bg-purple-50 rounded-lg"
            >
              <h3 className="text-lg font-medium text-purple-900 mb-4">
                AI Response:
              </h3>
              <div className="prose prose-purple">
                <p className="text-gray-700 whitespace-pre-line">
                  {response}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Popular Questions
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-white text-purple-600 rounded-full text-sm border border-purple-200 hover:bg-purple-50 transition-colors duration-200"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ This AI assistant provides general information only. Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
