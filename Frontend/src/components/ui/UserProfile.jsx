import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Heart, 
  BookOpen, 
  MapPin, 
  Brain,
  Dumbbell,
  TrendingUp,
  Award,
  Star,
  Edit,
  Settings,
  Bell,
  Download,
  Share2,
  ArrowRight,
  Baby,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const pregnancyProgress = {
    currentWeek: 24,
    totalWeeks: 40,
    dueDate: '2024-06-15',
    nextAppointment: '2024-03-20',
    lastCheckup: '2024-03-01'
  };

  const healthMetrics = {
    weight: 65,
    bloodPressure: '120/80',
    bloodSugar: 95,
    lastUpdated: '2024-03-15'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'exercise',
      title: 'Completed Prenatal Yoga',
      description: '30 minutes of gentle stretching and breathing exercises',
      time: '2 hours ago',
      icon: Dumbbell,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'nutrition',
      title: 'Logged Meal',
      description: 'Breakfast: Oatmeal with fruits and nuts',
      time: '4 hours ago',
      icon: Heart,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Upcoming Checkup',
      description: 'Routine prenatal visit with Dr. Smith',
      time: 'Tomorrow at 10:00 AM',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'AI Assistant',
      description: 'Get personalized advice',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      path: '/ai'
    },
    {
      title: 'Find Hospitals',
      description: 'Locate nearby maternity centers',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      path: '/hospitals'
    },
    {
      title: 'Exercise Guide',
      description: 'Safe pregnancy workouts',
      icon: Dumbbell,
      color: 'from-green-500 to-emerald-500',
      path: '/exercise'
    },
    {
      title: 'Diet Plans',
      description: 'Nutrition recommendations',
      icon: Heart,
      color: 'from-orange-500 to-red-500',
      path: '/diet'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'activities', name: 'Activities', icon: Award }
  ];

  const calculateProgress = () => {
    return (pregnancyProgress.currentWeek / pregnancyProgress.totalWeeks) * 100;
  };

  const getWeekInfo = (week) => {
    const weekInfo = {
      24: {
        title: "24 Weeks - Viability Milestone",
        description: "Your baby can now survive outside the womb with medical care",
        tips: ["Continue regular exercise", "Stay hydrated", "Monitor fetal movements"]
      }
    };
    return weekInfo[week] || {
      title: `${week} Weeks`,
      description: "Your pregnancy journey continues",
      tips: ["Stay active", "Eat well", "Rest when needed"]
    };
  };

  const weekInfo = getWeekInfo(pregnancyProgress.currentWeek);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-gray-600">
                Here's your pregnancy journey overview
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/update-profile')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Pregnancy Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pregnancy Progress</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Due: {pregnancyProgress.dueDate}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Bar */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Week {pregnancyProgress.currentWeek} of {pregnancyProgress.totalWeeks}</span>
                <span className="text-sm text-gray-500">{Math.round(calculateProgress())}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                />
              </div>
            </div>

            {/* Week Info */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Baby className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">{weekInfo.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{weekInfo.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => navigate(action.path)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  <div className="flex items-center text-purple-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Health Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="text-2xl font-bold text-gray-900">{healthMetrics.weight} kg</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Blood Pressure</p>
                        <p className="text-2xl font-bold text-gray-900">{healthMetrics.bloodPressure}</p>
                      </div>
                      <Heart className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Blood Sugar</p>
                        <p className="text-2xl font-bold text-gray-900">{healthMetrics.bloodSugar} mg/dL</p>
                      </div>
                      <Award className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center`}>
                          <activity.icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Tips</h3>
                    <ul className="space-y-2">
                      {weekInfo.tips.map((tip, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise Recommendations</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Prenatal yoga 3x per week
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Walking 30 minutes daily
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        Pelvic floor exercises
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Routine Prenatal Visit</h4>
                          <p className="text-sm text-gray-600">Dr. Sarah Smith - OBGYN</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Tomorrow</p>
                        <p className="text-xs text-gray-500">10:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Goals</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-700">Complete 3 exercise sessions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-700">Log all meals for 7 days</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <span className="text-sm text-gray-700">Schedule next appointment</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-gray-700">Completed 20 weeks milestone</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-gray-700">Maintained healthy weight gain</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-gray-700">Regular exercise routine</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
