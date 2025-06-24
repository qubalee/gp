import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Clock, Star, Users } from 'lucide-react'

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Regions' },
    { id: 'europe', label: 'Europe' },
    { id: 'asia', label: 'Asia' },
    { id: 'africa', label: 'Africa' },
    { id: 'americas', label: 'Americas' },
    { id: 'oceania', label: 'Oceania' }
  ]

  const locations = [
    {
      id: 1,
      name: 'Swiss Alps',
      category: 'europe',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      description: 'Explore the majestic mountain ranges of Switzerland',
      difficulty: 'Intermediate',
      duration: '15 min',
      rating: 4.8,
      participants: 1234
    },
    {
      id: 2,
      name: 'Sahara Desert',
      category: 'africa',
      image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
      description: 'Journey through the world\'s largest hot desert',
      difficulty: 'Advanced',
      duration: '20 min',
      rating: 4.9,
      participants: 987
    },
    {
      id: 3,
      name: 'Amazon Rainforest',
      category: 'americas',
      image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
      description: 'Discover the biodiversity of the Amazon basin',
      difficulty: 'Beginner',
      duration: '12 min',
      rating: 4.7,
      participants: 2156
    },
    {
      id: 4,
      name: 'Great Wall of China',
      category: 'asia',
      image: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg',
      description: 'Learn about this ancient architectural marvel',
      difficulty: 'Intermediate',
      duration: '18 min',
      rating: 4.9,
      participants: 3421
    },
    {
      id: 5,
      name: 'Great Barrier Reef',
      category: 'oceania',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
      description: 'Explore the world\'s largest coral reef system',
      difficulty: 'Beginner',
      duration: '10 min',
      rating: 4.8,
      participants: 1876
    },
    {
      id: 6,
      name: 'Norwegian Fjords',
      category: 'europe',
      image: 'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg',
      description: 'Navigate through stunning glacial valleys',
      difficulty: 'Advanced',
      duration: '25 min',
      rating: 4.9,
      participants: 765
    }
  ]

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="py-8 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore the <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">World</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover fascinating locations around the globe through interactive geography prompts and immersive learning experiences.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-gray-600">
            Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-effect rounded-2xl overflow-hidden card-hover group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(location.difficulty)}`}>
                    {location.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {location.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {location.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{location.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{location.participants.toLocaleString()}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{location.rating}</span>
                  </div>
                  <button className="btn-primary text-sm py-2 px-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No locations found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Explore