import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Calendar, 
  Clock, 
  MessageCircle, 
  FileText, 
  Heart,
  Baby,
  AlertCircle,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  Shield,
  TrendingUp,
  Users,
  Activity,
  Bell,
  Settings,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Download,
  Share2,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Mock data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      weeks: 24,
      dueDate: "2024-06-15",
      lastVisit: "2024-03-15",
      nextAppointment: "2024-03-22",
      status: "active",
      riskLevel: "low",
      phone: "+1-555-0123",
      email: "sarah.johnson@email.com",
      address: "123 Main St, City, State",
      notes: "First-time mother, healthy pregnancy so far",
      vitals: {
        bloodPressure: "120/80",
        weight: "65 kg",
        bloodSugar: "95 mg/dL"
      }
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      age: 32,
      weeks: 18,
      dueDate: "2024-07-20",
      lastVisit: "2024-03-10",
      nextAppointment: "2024-03-25",
      status: "active",
      riskLevel: "medium",
      phone: "+1-555-0124",
      email: "maria.rodriguez@email.com",
      address: "456 Oak Ave, City, State",
      notes: "High-risk pregnancy, monitoring closely",
      vitals: {
        bloodPressure: "135/85",
        weight: "68 kg",
        bloodSugar: "110 mg/dL"
      }
    },
    {
      id: 3,
      name: "Emily Chen",
      age: 26,
      weeks: 32,
      dueDate: "2024-05-10",
      lastVisit: "2024-03-12",
      nextAppointment: "2024-03-28",
      status: "active",
      riskLevel: "low",
      phone: "+1-555-0125",
      email: "emily.chen@email.com",
      address: "789 Pine Rd, City, State",
      notes: "Second pregnancy, everything normal",
      vitals: {
        bloodPressure: "118/78",
        weight: "72 kg",
        bloodSugar: "92 mg/dL"
      }
    }
  ];

  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      date: "2024-03-22",
      time: "10:00 AM",
      type: "Routine Checkup",
      status: "confirmed",
      duration: "30 min"
    },
    {
      id: 2,
      patientName: "Maria Rodriguez",
      date: "2024-03-25",
      time: "2:00 PM",
      type: "Ultrasound",
      status: "confirmed",
      duration: "45 min"
    },
    {
      id: 3,
      patientName: "Emily Chen",
      date: "2024-03-28",
      time: "11:30 AM",
      type: "Routine Checkup",
      status: "pending",
      duration: "30 min"
    }
  ];

  const tabs = [
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'reports', name: 'Reports', icon: FileText }
  ];

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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
                Doctor Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your patients, appointments, and medical records
              </p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Appointment
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">+12% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">Next: 10:00 AM</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Messages</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">2 urgent</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High-Risk Cases</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600">Monitor closely</span>
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
            {/* Navigation Tabs */}
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

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-gray-50 transition-colors">
                  <Plus className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Add New Patient</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Schedule Appointment</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-gray-50 transition-colors">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Generate Report</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 text-left rounded-xl hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-gray-700">Send Message</span>
                </button>
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
            {activeTab === 'patients' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search patients by name, email, or phone..."
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
                    </div>
                  </div>
                </div>

                {/* Patients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {patients.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                            <p className="text-sm text-gray-500">{patient.age} years old</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(patient.riskLevel)}`}>
                          {patient.riskLevel} risk
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Pregnancy Week:</span>
                          <span className="font-medium">{patient.weeks} weeks</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="font-medium">{patient.dueDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Next Appointment:</span>
                          <span className="font-medium">{patient.nextAppointment}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
                    <button
                      onClick={() => setShowAppointmentModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      New Appointment
                    </button>
                  </div>

                  <div className="space-y-4">
                    {appointments.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{appointment.patientName}</h4>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                              <span>{appointment.date}</span>
                              <span>{appointment.time}</span>
                              <span>{appointment.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Patient Messages</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                      <p className="text-sm text-gray-600">Experiencing severe morning sickness, need advice</p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-medium">
                      Urgent
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Medical Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">Monthly Summary</h4>
                    <p className="text-sm text-gray-600 mb-3">Patient statistics and trends</p>
                    <button className="text-purple-600 text-sm font-medium">Generate Report →</button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-2">High-Risk Cases</h4>
                    <p className="text-sm text-gray-600 mb-3">Detailed analysis of high-risk patients</p>
                    <button className="text-purple-600 text-sm font-medium">View Report →</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Appointment Modal */}
        <AnimatePresence>
          {showAppointmentModal && (
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
                  <h3 className="text-xl font-semibold text-gray-900">Schedule New Appointment</h3>
                  <button
                    onClick={() => setShowAppointmentModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Select a patient</option>
                      {patients.map(patient => (
                        <option key={patient.id}>{patient.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Routine Checkup</option>
                      <option>Ultrasound</option>
                      <option>Blood Test</option>
                      <option>Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Add any notes or special instructions..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowAppointmentModal(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Schedule Appointment
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

export default DoctorDashboard; 