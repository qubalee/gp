import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Brain, Users, Award, ArrowRight, Globe, Zap, Shield } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Interactive Maps',
      description: 'Explore the world with our interactive geography maps and visual prompts.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'Smart Quizzes',
      description: 'Test your knowledge with adaptive quizzes that adjust to your learning pace.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join a community of geography enthusiasts and learn together.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges and track your progress as you master world geography.',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Active Learners' },
    { number: '195', label: 'Countries Covered' },
    { number: '50K+', label: 'Questions Answered' },
    { number: '98%', label: 'Success Rate' }
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="text-gray-900">the World</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master geography through interactive prompts, visual learning, and engaging quizzes. 
              Explore every corner of our planet with confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/explore" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Exploring</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/quiz" className="btn-secondary inline-flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Take a Quiz</span>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="glass-effect rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg"
                alt="World Map"
                className="w-full h-64 md:h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Geoprompts?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methods 
              to make geography education engaging and effective.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-effect rounded-2xl p-8 card-hover"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Secure & Reliable
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your learning journey is protected with enterprise-grade security and privacy measures.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Data Protection',
                description: 'Your personal information is encrypted and securely stored with industry-standard protocols.'
              },
              {
                icon: Zap,
                title: 'Fast & Reliable',
                description: 'Lightning-fast performance with 99.9% uptime guarantee for uninterrupted learning.'
              },
              {
                icon: Globe,
                title: 'Global Access',
                description: 'Access your learning materials from anywhere in the world, on any device.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already discovering the world through Geoprompts. 
              Start your geography adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="btn-primary inline-flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Start Learning Now</span>
              </Link>
              <Link to="/profile" className="btn-secondary inline-flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Join Community</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home