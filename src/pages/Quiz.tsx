import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Clock, Award, RotateCcw, CheckCircle, XCircle, ArrowRight } from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  image?: string
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])

  const questions: Question[] = [
    {
      id: 1,
      question: "Which is the largest continent by land area?",
      options: ["Africa", "Asia", "North America", "Europe"],
      correct: 1,
      explanation: "Asia is the largest continent, covering about 30% of Earth's total land area.",
      image: "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg"
    },
    {
      id: 2,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: 2,
      explanation: "Canberra is the capital city of Australia, located in the Australian Capital Territory.",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg"
    },
    {
      id: 3,
      question: "Which river is the longest in the world?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
      correct: 1,
      explanation: "The Nile River is traditionally considered the longest river in the world at approximately 6,650 km.",
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg"
    },
    {
      id: 4,
      question: "Which mountain range contains Mount Everest?",
      options: ["Andes", "Rocky Mountains", "Alps", "Himalayas"],
      correct: 3,
      explanation: "Mount Everest is located in the Himalayas on the border between Nepal and Tibet.",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
    },
    {
      id: 5,
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      correct: 1,
      explanation: "Vatican City is the smallest country in the world with an area of just 0.17 square miles.",
      image: "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg"
    }
  ]

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion()
    }
  }, [timeLeft, showResult, quizCompleted])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newUserAnswers = [...userAnswers, selectedAnswer ?? -1]
    setUserAnswers(newUserAnswers)

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(30)
      } else {
        setQuizCompleted(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setTimeLeft(30)
    setQuizCompleted(false)
    setUserAnswers([])
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "Excellent! You're a geography expert! 🌟"
    if (percentage >= 60) return "Great job! You know your geography well! 👏"
    if (percentage >= 40) return "Good effort! Keep learning and exploring! 📚"
    return "Don't give up! Geography is fascinating - try again! 💪"
  }

  if (quizCompleted) {
    return (
      <div className="py-8 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-3xl p-8 max-w-2xl w-full text-center"
        >
          <div className="mb-8">
            <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
            <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mb-8">
            <div className="text-6xl font-bold text-primary-600 mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-lg text-gray-600">Final Score</div>
            <div className="text-2xl font-semibold text-gray-900 mt-2">
              {Math.round((score / questions.length) * 100)}%
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={resetQuiz} className="btn-primary inline-flex items-center space-x-2">
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <button className="btn-secondary inline-flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>More Quizzes</span>
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Geography <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Quiz</span>
          </h1>
          <p className="text-xl text-gray-600">Test your knowledge of world geography</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
              <Clock className="w-4 h-4" />
              <span className={timeLeft <= 10 ? 'text-red-500' : ''}>{timeLeft}s</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="glass-effect rounded-3xl overflow-hidden"
          >
            {/* Question Image */}
            {questions[currentQuestion].image && (
              <div className="h-64 overflow-hidden">
                <img
                  src={questions[currentQuestion].image}
                  alt="Question illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      showResult
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-100 border-2 border-green-500 text-green-800'
                          : selectedAnswer === index
                          ? 'bg-red-100 border-2 border-red-500 text-red-800'
                          : 'bg-gray-100 text-gray-500'
                        : selectedAnswer === index
                        ? 'bg-primary-100 border-2 border-primary-500 text-primary-800'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-300'
                    }`}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && (
                        <div>
                          {index === questions[currentQuestion].correct ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="w-6 h-6 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Explanation */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
                >
                  <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
                  <p className="text-blue-800">{questions[currentQuestion].explanation}</p>
                </motion.div>
              )}

              {/* Next Button */}
              {!showResult && selectedAnswer !== null && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleNextQuestion}
                  className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                >
                  <span>
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-6">
            <div>
              <div className="text-2xl font-bold text-primary-600">{score}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{currentQuestion + 1}</div>
              <div className="text-sm text-gray-600">Current</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div>
              <div className="text-2xl font-bold text-gray-600">{questions.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Quiz