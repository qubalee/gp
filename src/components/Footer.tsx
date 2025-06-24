import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Heart, Github, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer 
      className="glass-effect mt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Geoprompts
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Discover the world through interactive geography prompts and visual learning experiences. 
              Make learning geography fun and engaging with our innovative platform.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for geography enthusiasts</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">How it Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Geoprompts. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer