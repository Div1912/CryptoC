import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Shield, Search, CheckCircle, TrendingUp, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700  to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Secure Academic Credentials on the Blockchain
              </h1>
              <p className="mt-6 text-xl text-indigo-100">
                Issue, verify, and manage tamper-proof academic credentials as NFTs on the blockchain.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/credentials" className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-md shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <Award className="mr-2 h-5 w-5" />
                  View Credentials
                </Link>
                <Link to="/issue" className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-500 transition-colors border border-indigo-500 flex items-center justify-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Issue Credential
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Academic Credentials" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <Award />, stat: "10,000+", label: "Credentials Issued" },
            { icon: <Users />, stat: "500+", label: "Institutions" },
            { icon: <CheckCircle />, stat: "99.9%", label: "Verification Rate" },
            { icon: <Globe />, stat: "50+", label: "Countries" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-indigo-100 p-3 rounded-full mb-4">
                <div className="text-indigo-700 h-8 w-8">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{item.stat}</h3>
              <p className="text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform leverages blockchain technology to create a secure, transparent, and efficient credential management system.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <GraduationCap className="h-6 w-6 text-indigo-700" />,
              title: "Issue Credentials",
              description: "Educational institutions can issue verifiable credentials as NFTs on the blockchain, ensuring their authenticity and immutability."
            },
            {
              icon: <Award className="h-6 w-6 text-indigo-700" />,
              title: "Receive & Share",
              description: "Students receive their credentials directly in their digital wallet and can share them with employers or other institutions."
            },
            {
              icon: <Search className="h-6 w-6 text-indigo-700" />,
              title: "Verify Instantly",
              description: "Employers and other institutions can instantly verify the authenticity of credentials without contacting the issuing institution."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-indigo-300 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from institutions, students, and employers who are using our platform.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform has revolutionized how we issue and manage academic credentials. The verification process is seamless.",
                author: "Dr. Sarah Johnson",
                role: "Dean of Admissions, Stanford University",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
              },
              {
                quote: "As a student, having my degrees as NFTs gives me complete control over my credentials and makes sharing them with employers so much easier.",
                author: "Michael Chen",
                role: "Computer Science Graduate",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
              },
              {
                quote: "The instant verification feature has streamlined our hiring process. We can now verify candidates' credentials in seconds.",
                author: "Jessica Williams",
                role: "HR Director, Tech Innovations Inc.",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Join thousands of institutions and students already using our platform to secure and verify academic credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/connect" className="inline-flex items-center px-8 py-3 bg-white text-indigo-700 font-medium rounded-md shadow-md hover:bg-gray-100 transition-colors">
                <Shield className="h-5 w-5 mr-2" />
                Connect Wallet
              </Link>
              <Link to="/register" className="inline-flex items-center px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-indigo-700 transition-colors">
                <Users className="h-5 w-5 mr-2" />
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Leading Institutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is used by top universities and organizations worldwide.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {[
            "Harvard University",
            "Stanford University",
            "MIT",
            "Oxford University",
            "Cambridge University",
            "Yale University",
            "Princeton University",
            "Columbia University"
          ].map((partner, index) => (
            <motion.div 
              key={index}
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full text-center">
                <p className="font-semibold text-gray-700">{partner}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;