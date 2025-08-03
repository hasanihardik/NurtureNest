import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  User,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Tag,
  Image,
  File,
  Folder,
  Star,
  Lock,
  Unlock,
  Camera,
  Scan,
  Cloud,
  Database,
  Archive,
  RefreshCw,
  Settings,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

const HealthRecords = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const fileInputRef = useRef(null);

  // Mock data
  const categories = [
    { id: 'all', name: 'All Records', icon: FileText, count: 24 },
    { id: 'prescriptions', name: 'Prescriptions', icon: File, count: 8 },
    { id: 'lab-reports', name: 'Lab Reports', icon: Database, count: 6 },
    { id: 'scans', name: 'Scans & Images', icon: Image, count: 5 },
    { id: 'appointments', name: 'Appointments', icon: Calendar, count: 3 },
    { id: 'vaccinations', name: 'Vaccinations', icon: Shield, count: 2 }
  ];

  const records = [
    {
      id: 1,
      name: "Prenatal Blood Test Results",
      type: "lab-reports",
      date: "2024-03-15",
      size: "2.4 MB",
      status: "processed",
      tags: ["blood test", "prenatal", "important"],
      thumbnail: "/lab-report.jpg",
      isEncrypted: true,
      isStarred: true
    },
    {
      id: 2,
      name: "Ultrasound Scan - Week 20",
      type: "scans",
      date: "2024-03-10",
      size: "8.7 MB",
      status: "processed",
      tags: ["ultrasound", "20 weeks", "baby"],
      thumbnail: "/ultrasound.jpg",
      isEncrypted: true,
      isStarred: true
    },
    {
      id: 3,
      name: "Prenatal Vitamin Prescription",
      type: "prescriptions",
      date: "2024-03-08",
      size: "1.2 MB",
      status: "processed",
      tags: ["prescription", "vitamins", "prenatal"],
      thumbnail: "/prescription.jpg",
      isEncrypted: false,
      isStarred: false
    },
    {
      id: 4,
      name: "Appointment Summary - Dr. Smith",
      type: "appointments",
      date: "2024-03-05",
      size: "0.8 MB",
      status: "processed",
      tags: ["appointment", "doctor", "summary"],
      thumbnail: "/appointment.jpg",
      isEncrypted: false,
      isStarred: false
    },
    {
      id: 5,
      name: "Blood Pressure Monitoring",
      type: "lab-reports",
      date: "2024-03-01",
      size: "1.5 MB",
      status: "processing",
      tags: ["blood pressure", "monitoring", "vital signs"],
      thumbnail: "/bp-monitor.jpg",
      isEncrypted: true,
      isStarred: false
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setShowUploadModal(true);
  };

  const uploadFiles = async () => {
    setUploading(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploading(false);
    setShowUploadModal(false);
    setSelectedFiles([]);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'scans':
        return Image;
      case 'prescriptions':
        return File;
      case 'lab-reports':
        return Database;
      case 'appointments':
        return Calendar;
      case 'vaccinations':
        return Shield;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeTab === 'all' || record.type === activeTab;
    return matchesSearch && matchesCategory;
  });

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
                Health Records
              </h1>
              <p className="text-gray-600">
                Securely store and manage all your pregnancy-related medical documents
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Files
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
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
                placeholder="Search records, tags, or dates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {viewMode === 'grid' ? (
                  <div className="space-y-1 w-4 h-4">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                )}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
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
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === category.id
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Used</span>
                    <span className="text-gray-900">18.7 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>30 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available</span>
                    <span>11.3 GB</span>
                  </div>
                </div>
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
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        {React.createElement(getFileIcon(record.type), { className: "w-12 h-12 text-purple-600" })}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        {record.isStarred && (
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-yellow-600 fill-current" />
                          </div>
                        )}
                        {record.isEncrypted && (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Lock className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{record.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{record.date}</span>
                        <span>{record.size}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {record.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                        {record.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{record.tags.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                        {React.createElement(getFileIcon(record.type), { className: "w-6 h-6 text-purple-600" })}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{record.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{record.date}</span>
                          <span>{record.size}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {record.isStarred && <Star className="w-4 h-4 text-yellow-600 fill-current" />}
                        {record.isEncrypted && <Lock className="w-4 h-4 text-blue-600" />}
                        <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
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
                  <h3 className="text-xl font-semibold text-gray-900">Upload Files</h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drop files here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports PDF, JPG, PNG, DOC files</p>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Selected Files:</h4>
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <File className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={uploadFiles}
                      disabled={uploading || selectedFiles.length === 0}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Uploading...
                        </div>
                      ) : (
                        'Upload Files'
                      )}
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

export default HealthRecords; 