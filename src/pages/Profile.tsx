import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Award, MapPin, Brain, Calendar, Star, Trophy, Target, TrendingUp, Settings } from 'lucide-react'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const userStats = {
    name: 'Geography Explorer',
    level: 15,
    xp: 2450,
    nextLevelXp: 3000,
    totalQuizzes: 47,
    correctAnswers: 312,
    accuracy: 89,
    streak: 12,
    countriesExplored: 23,
    badges: 8
  }

  const achievements = [
    {
      id: 1,
      title: 'World Explorer',
      description: 'Explored 20+ countries',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      earned: true,
      date: '2024-12-15'
    },
    {
      id: 2,
      title: 'Quiz Master',
      description: 'Completed 50+ quizzes',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      earned: false,
      progress: 94
    },
    {
      id: 3,
      title: 'Perfect Score',
      description: 'Got 100% on a quiz',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      earned: true,
      date: '2024-12-10'
    },
    {
      id: 4,
      title: 'Streak Champion',
      description: '30-day learning streak',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      earned: false,
      progress: 40
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'quiz',
      title: 'European Capitals Quiz',
      score: '8/10',
      date: '2 hours ago',
      xp: 80
    },
    {
      id: 2,
      type: 'explore',
      title: 'Amazon Rainforest',
      date: '1 day ago',
      xp: 50
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Earned "World Explorer" badge',
      date: '3 days ago',
      xp: 100
    },
    {
      id: 4,
      type: 'quiz',
      title: 'Asian Geography Quiz',
      score: '9/10',
      date: '5 days ago',
      xp: 90
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'activity', label: 'Activity', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return Brain
      case 'explore': return MapPin
      case 'achievement': return Award
      default: return Target
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'quiz': return 'text-purple-600 bg-purple-100'
      case 'explore': return 'text-blue-600 bg-blue-100'
      case 'achievement': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="py-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-xl text-gray-600">Track your geography learning journey</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {userStats.level}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{userStats.name}</h2>
              <p className="text-gray-600 mb-4">Level {userStats.level} Geography Explorer</p>
              
              {/* XP Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Experience Points</span>
                  <span className="text-sm font-medium text-gray-900">
                    {userStats.xp} / {userStats.nextLevelXp} XP
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{userStats.totalQuizzes}</div>
                  <div className="text-sm text-gray-600">Quizzes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">{userStats.accuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userStats.badges}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-effect rounded-2xl p-2 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Learning Progress */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-primary-600" />
                  Learning Progress
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Countries Explored</span>
                    <span className="font-semibold text-gray-900">{userStats.countriesExplored}/195</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${(userStats.countriesExplored / 195) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quiz Accuracy</span>
                    <span className="font-semibold text-gray-900">{userStats.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${userStats.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-yellow-600" />
                  Recent Achievements
                </h3>
                <div className="space-y-4">
                  {achievements.filter(a => a.earned).slice(0, 3).map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
                        <achievement.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{achievement.title}</div>
                        <div className="text-sm text-gray-600">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`glass-effect rounded-2xl p-6 ${
                    achievement.earned ? 'ring-2 ring-yellow-400' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 mb-4">{achievement.description}</p>
                      
                      {achievement.earned ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="font-medium">Earned on {achievement.date}</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Progress</span>
                            <span className="text-sm font-medium text-gray-900">{achievement.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full`}
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-600">{activity.date}</div>
                      </div>
                      <div className="text-right">
                        {activity.score && (
                          <div className="font-semibold text-gray-900">{activity.score}</div>
                        )}
                        <div className="text-sm text-primary-600">+{activity.xp} XP</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="text-gray-700">Daily learning reminders</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="text-gray-700">Achievement notifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Weekly progress reports</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Privacy</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="text-gray-700">Show profile to other users</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span className="text-gray-700">Share learning progress</span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button className="btn-primary">Save Settings</button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile