import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from "../../context/AuthContext";
import { 
  Heart, 
  BookOpen, 
  MapPin, 
  Dumbbell, 
  Brain, 
  Calendar,
  Star,
  ArrowRight,
  Play,
  Shield,
  Users,
  Award
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const features = [
    {
      title: "AI Pregnancy Assistant",
      description: "Get personalized guidance and answers to all your pregnancy questions",
      icon: Brain,
      link: user ? "/ai" : "/login",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      title: "Hospital Finder",
      description: "Find the best maternity hospitals and clinics near you",
      icon: MapPin,
      link: user ? "/hospitals" : "/login",
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      title: "Personalized Diet Plans",
      description: "AI-powered nutrition recommendations for each trimester",
      icon: Heart,
      link: user ? "/diet" : "/login",
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      title: "Safe Exercise Guide",
      description: "Trimester-specific exercises for a healthy pregnancy",
      icon: Dumbbell,
      link: user ? "/exercise" : "/login",
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      title: "Pregnancy Books",
      description: "Curated collection of pregnancy and parenting books",
      icon: BookOpen,
      link: user ? "/books" : "/login",
      color: "from-indigo-500 to-purple-500",
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-500"
    },
    {
      title: "Growth Tracking",
      description: "Track your baby's development through sonography reports",
      icon: Calendar,
      link: user ? "/sonography" : "/login",
      color: "from-teal-500 to-blue-500",
      gradient: "bg-gradient-to-br from-teal-500 to-blue-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time mom",
      content: "NurtureNest has been my go-to companion throughout my pregnancy. The AI assistant answered all my questions!",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Expecting mother",
      content: "The hospital finder feature helped me find the perfect maternity hospital near my home. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "Second-time mom",
      content: "The personalized diet plans and exercise guides made my pregnancy journey so much easier and healthier.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Mothers" },
    { number: "50+", label: "Expert Doctors" },
    { number: "100+", label: "Hospitals Listed" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 h-screen flex flex-col items-center justify-center text-white px-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 w-96 bg-white/20 rounded-lg" />
              <div className="h-6 w-64 bg-white/20 rounded-lg" />
            </div>
          ) : (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center max-w-4xl"
>
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {user?.username ? `Welcome back, ${user.username}!` : "NurtureNest"}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your caring and supportive space for expecting mothers, offering personalized diet plans, exercises, expert guidance, and AI-powered insights for a healthy and joyful pregnancy journey.
              </motion.p>
              
              {!user ? (
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={() => navigate('/RegisterUser')}
                    className="group px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={() => navigate('/profile')}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30"
                  >
                    Continue Your Journey
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for a Healthy Pregnancy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered guidance to hospital finders, we've got you covered throughout your pregnancy journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(feature.link)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="p-8">
                    <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Mothers Say About Us
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy mothers who trust NurtureNest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {user && (
        <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Ready to Continue Your Journey?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Check your personalized dashboard, track your progress, or get new recommendations.
            </motion.p>
            <motion.button
              onClick={() => navigate('/profile')}
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Go to Dashboard
            </motion.button>
          </div>
        </div>
      )}

      {/* Features Highlight */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Backed by medical professionals and pregnancy experts</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">Trusted by thousands of mothers worldwide</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
