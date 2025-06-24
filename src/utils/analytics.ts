// Privacy-focused analytics utilities
interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  timestamp: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private readonly maxEvents = 100
  private readonly batchSize = 10

  // Track user interactions without PII
  track(event: string, category: string, action: string, label?: string, value?: number) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      timestamp: Date.now()
    }

    this.events.push(analyticsEvent)

    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents)
    }

    // Auto-batch send events
    if (this.events.length >= this.batchSize) {
      this.flush()
    }
  }

  // Track quiz performance
  trackQuizCompletion(score: number, totalQuestions: number, category: string, duration: number) {
    this.track('quiz_completed', 'engagement', 'quiz', category, score)
    this.track('quiz_accuracy', 'performance', 'accuracy', category, Math.round((score / totalQuestions) * 100))
    this.track('quiz_duration', 'performance', 'duration', category, duration)
  }

  // Track learning progress
  trackLearningProgress(action: string, content: string) {
    this.track('learning_progress', 'education', action, content)
  }

  // Track user engagement
  trackPageView(page: string) {
    this.track('page_view', 'navigation', 'view', page)
  }

  // Get analytics summary (for user insights)
  getSummary() {
    const quizEvents = this.events.filter(e => e.category === 'engagement' && e.action === 'quiz')
    const totalQuizzes = quizEvents.length
    const averageScore = totalQuizzes > 0 
      ? quizEvents.reduce((sum, e) => sum + (e.value || 0), 0) / totalQuizzes 
      : 0

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore * 100) / 100,
      totalEvents: this.events.length,
      categories: [...new Set(this.events.map(e => e.category))]
    }
  }

  // Send events to analytics service (mock implementation)
  private async flush() {
    if (this.events.length === 0) return

    try {
      // In a real implementation, this would send to your analytics service
      console.log('Analytics batch:', this.events.slice(0, this.batchSize))
      
      // Remove sent events
      this.events = this.events.slice(this.batchSize)
    } catch (error) {
      console.warn('Analytics flush failed:', error)
    }
  }

  // Clear all stored events
  clear() {
    this.events = []
  }
}

export const analytics = new Analytics()

// Convenience functions
export const trackQuizStart = (category: string) => {
  analytics.track('quiz_started', 'engagement', 'start', category)
}

export const trackQuizComplete = (score: number, total: number, category: string, duration: number) => {
  analytics.trackQuizCompletion(score, total, category, duration)
}

export const trackExploreLocation = (location: string) => {
  analytics.trackLearningProgress('explore', location)
}

export const trackPageView = (page: string) => {
  analytics.trackPageView(page)
}