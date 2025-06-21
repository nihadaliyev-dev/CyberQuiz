// Application Configuration Constants
export const APP_CONFIG = {
  // App Information
  NAME: "CyberQuiz",
  VERSION: "1.0.0",
  DESCRIPTION: "Interactive Cybersecurity Quiz Application",

  // Development/Production flags
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",

  // Local Storage Keys
  STORAGE_KEYS: {
    USER_TOKEN: "cyberquiz_user_token",
    USER_PROFILE: "cyberquiz_user_profile",
    QUIZ_PROGRESS: "cyberquiz_progress",
    QUIZ_RESULTS: "cyberquiz_results",
    THEME_PREFERENCE: "cyberquiz_theme",
    LANGUAGE: "cyberquiz_language",
  },

  // Quiz Configuration
  QUIZ: {
    DEFAULT_TIME_LIMIT: 300, // 5 minutes in seconds
    MAX_QUESTIONS_PER_QUIZ: 20,
    MIN_QUESTIONS_PER_QUIZ: 5,
    POINTS_PER_CORRECT_ANSWER: 10,
    BONUS_POINTS_FOR_SPEED: 5,
    PENALTY_FOR_WRONG_ANSWER: 0,
  },

  // UI Configuration
  UI: {
    ANIMATION_DURATION: 300, // milliseconds
    TOAST_DURATION: 3000, // milliseconds
    MODAL_ANIMATION_DURATION: 200,
    LOADING_TIMEOUT: 5000,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
    MIN_PAGE_SIZE: 5,
  },
};

// Quiz Categories
export const QUIZ_CATEGORIES = {
  NETWORK_SECURITY: "network-security",
  CRYPTOGRAPHY: "cryptography",
  WEB_SECURITY: "web-security",
  MALWARE: "malware",
  SOCIAL_ENGINEERING: "social-engineering",
  INCIDENT_RESPONSE: "incident-response",
  FORENSICS: "forensics",
  COMPLIANCE: "compliance",
};

// Quiz Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  EXPERT: "expert",
};

// User Roles
export const USER_ROLES = {
  STUDENT: "student",
  INSTRUCTOR: "instructor",
  ADMIN: "admin",
};

// Theme Options
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
};

// Supported Languages
export const LANGUAGES = {
  EN: "en",
  ES: "es",
  FR: "fr",
  DE: "de",
  AR: "ar",
};

// Error Types
export const ERROR_TYPES = {
  NETWORK: "network",
  VALIDATION: "validation",
  AUTHENTICATION: "authentication",
  AUTHORIZATION: "authorization",
  NOT_FOUND: "not_found",
  SERVER: "server",
  UNKNOWN: "unknown",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  QUIZ_COMPLETED: "Quiz completed successfully!",
  ANSWER_SUBMITTED: "Answer submitted successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  LOGIN_SUCCESS: "Login successful!",
  REGISTRATION_SUCCESS: "Registration successful!",
  PASSWORD_CHANGED: "Password changed successfully!",
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters long",
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  INVALID_USERNAME:
    "Username must be 3-20 characters long and contain only letters, numbers, and underscores",
};
