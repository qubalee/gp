// Input validation utilities
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 1000) // Limit length
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  return usernameRegex.test(username)
}

// Rate limiting for quiz attempts
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  private readonly maxAttempts: number
  private readonly windowMs: number

  constructor(maxAttempts: number = 10, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  canAttempt(identifier: string): boolean {
    const now = Date.now()
    const attempts = this.attempts.get(identifier) || []
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs)
    
    if (validAttempts.length >= this.maxAttempts) {
      return false
    }

    // Add current attempt
    validAttempts.push(now)
    this.attempts.set(identifier, validAttempts)
    
    return true
  }

  getRemainingAttempts(identifier: string): number {
    const now = Date.now()
    const attempts = this.attempts.get(identifier) || []
    const validAttempts = attempts.filter(time => now - time < this.windowMs)
    
    return Math.max(0, this.maxAttempts - validAttempts.length)
  }
}

// Content Security Policy helpers
export const generateNonce = (): string => {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// XSS prevention
export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Secure random ID generation
export const generateSecureId = (): string => {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}