import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Share2, 
  Bookmark, 
  MoreVertical,
  Send,
  Search,
  Filter,
  Plus,
  Calendar,
  MapPin,
  Baby,
  Star,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  User,
  Clock,
  ThumbsUp,
  MessageSquare,
  Eye,
  Hash,
  Bell,
  Settings,
  X
} from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('forums');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const groups = [
    {
      id: 1,
      name: "First-Time Moms",
      members: 1247,
      description: "Support and advice for first-time mothers",
      icon: Baby,
      color: "from-pink-500 to-rose-500",
      isJoined: true
    },
    {
      id: 2,
      name: "High-Risk Pregnancy",
      members: 892,
      description: "Support group for high-risk pregnancies",
      icon: AlertCircle,
      color: "from-orange-500 to-red-500",
      isJoined: false
    },
    {
      id: 3,
      name: "Third Trimester",
      members: 2156,
      description: "Preparing for delivery and postpartum",
      icon: Calendar,
      color: "from-purple-500 to-violet-500",
      isJoined: true
    },
    {
      id: 4,
      name: "Pregnancy Nutrition",
      members: 1834,
      description: "Healthy eating during pregnancy",
      icon: Heart,
      color: "from-green-500 to-emerald-500",
      isJoined: false
    }
  ];

  const posts = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "SJ",
      group: "First-Time Moms",
      title: "Feeling anxious about delivery",
      content: "I'm 32 weeks and starting to feel really anxious about labor. Any tips for managing anxiety?",
      likes: 24,
      comments: 18,
      time: "2 hours ago",
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      author: "Maria Rodriguez",
      avatar: "MR",
      group: "Third Trimester",
      title: "Hospital bag checklist",
      content: "What are the essential items you packed in your hospital bag? Looking for recommendations!",
      likes: 45,
      comments: 32,
      time: "5 hours ago",
      isLiked: true,
      isBookmarked: true
    },
    {
      id: 3,
      author: "Emily Chen",
      avatar: "EC",
      group: "Pregnancy Nutrition",
      title: "Best foods for morning sickness",
      content: "Struggling with morning sickness. What foods helped you the most?",
      likes: 67,
      comments: 41,
      time: "1 day ago",
      isLiked: false,
      isBookmarked: false
    }
  ];

  const tabs = [
    { id: 'forums', name: 'Forums', icon: MessageCircle },
    { id: 'groups', name: 'Groups', icon: Users },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'resources', name: 'Resources', icon: Bookmark }
  ];

  const handleLike = (postId) => {
    // Mock like functionality
    console.log('Liked post:', postId);
  };

  const handleJoinGroup = (groupId) => {
    // Mock join group functionality
    console.log('Joined group:', groupId);
  };

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
                Community Hub
              </h1>
              <p className="text-gray-600">
                Connect with other mothers, share experiences, and find support
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Post
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts, groups, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <TrendingUp className="w-4 h-4" />
                Trending
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Groups */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Groups</h3>
              <div className="space-y-3">
                {groups.filter(g => g.isJoined).map((group) => (
                  <motion.div
                    key={group.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${group.color} rounded-lg flex items-center justify-center`}>
                      <group.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{group.name}</h4>
                      <p className="text-xs text-gray-500">{group.members} members</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {activeTab === 'forums' && (
              <div className="space-y-6">
                {/* Featured Post */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Featured Discussion</h3>
                      <p className="text-white/80">Most popular topic this week</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">"What's your biggest pregnancy fear and how do you cope?"</h4>
                  <p className="text-white/90 mb-4">
                    Join the conversation with 200+ mothers sharing their experiences and support strategies.
                  </p>
                  <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Join Discussion
                  </button>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">{post.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{post.author}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{post.group}</span>
                              <span>•</span>
                              <span>{post.time}</span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                              post.isLiked
                                ? 'bg-red-100 text-red-600'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                        </div>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            post.isBookmarked
                              ? 'bg-purple-100 text-purple-600'
                              : 'hover:bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${group.color} rounded-xl flex items-center justify-center`}>
                          <group.icon className="w-6 h-6 text-white" />
                        </div>
                        <button
                          onClick={() => handleJoinGroup(group.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            group.isJoined
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {group.isJoined ? 'Joined' : 'Join'}
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-gray-600 mb-4">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{group.members} members</span>
                        <span>•</span>
                        <span>Active daily</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Virtual Prenatal Yoga Class</h4>
                      <p className="text-sm text-gray-600">Join us for a relaxing yoga session</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Tomorrow, 10:00 AM</span>
                        <span>•</span>
                        <span>Online</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Helpful Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Pregnancy Week-by-Week Guide</h4>
                    <p className="text-sm text-gray-600 mb-3">Track your baby's development</p>
                    <button className="text-purple-600 text-sm font-medium">Read More →</button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Nutrition Guidelines</h4>
                    <p className="text-sm text-gray-600 mb-3">What to eat during pregnancy</p>
                    <button className="text-purple-600 text-sm font-medium">Read More →</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Create Post Modal */}
        <AnimatePresence>
          {showCreatePost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Create New Post</h3>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      rows={4}
                      placeholder="Share your thoughts, questions, or experiences..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Select a group</option>
                      {groups.filter(g => g.isJoined).map(group => (
                        <option key={group.id}>{group.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Post
                    </button>
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

export default Community; 