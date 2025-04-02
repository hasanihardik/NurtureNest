import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from "../../context/AuthContext";
import "@fontsource/jaro";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const features = [
    {
      title: "Track Your Baby's Growth",
      description: "Track fetal development and growth through sonography reports",
      image: "/hp2.jpg",
      link: user ? "/sonography" : "/login",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Find Nearby Hospitals",
      description: "Locate and get information about maternity hospitals in your area",
      image: "/hp2.jpg",
      link: user ? "/hospitals" : "/login",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Personalized Diet Plans",
      description: "Get AI-powered diet recommendations based on your trimester",
      image: "/diet-plans-1.jpg",
      link: user ? "/diet" : "/login",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Safe Exercises",
      description: "Access trimester-specific exercise guides for a healthy pregnancy",
      image: "/e1.jpg",
      link: user ? "/exercise" : "/login",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gradient-to-br from-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-64 bg-white/20 rounded" />
              <div className="h-4 w-48 bg-white/20 rounded" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {user?.username ? `Welcome back, ${user.username}!` : "Mom's Companion"}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Your trusted partner throughout your pregnancy journey
              </p>
              {!user && (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/RegisterUser')}
                    className="px-6 py-3 bg-purple-800 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => navigate(feature.link)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} mix-blend-multiply transition-opacity group-hover:opacity-75`} />
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {user && (
        <div className="bg-purple-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Ready to Continue Your Journey?
            </h2>
            <p className="text-lg text-gray-600">
              Check your personalized dashboard, track your progress, or get new recommendations.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
