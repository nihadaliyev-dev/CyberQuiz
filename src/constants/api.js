// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: import.meta.env.REACT_API_BASE_URL || "http://localhost:3000",

  VERSION: "v1",

  TIMEOUT: 10000,
};

export const ENDPOINTS = {
  QUIZ: {
    GET_ALL: "/quiz",
    GET_BY_ID: (id) => `/quiz/${id}`,
    GET_BY_CATEGORY: (category) => `/quiz/category/${category}`,
    GET_BY_DIFFICULTY: (difficulty) => `/quiz/difficulty/${difficulty}`,
    SUBMIT_ANSWER: "/quiz/submit",
    GET_RESULTS: (quizId) => `/quiz/${quizId}/results`,
  },

  USER: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    GET_SCORES: "/user/scores",
    GET_HISTORY: "/user/history",
  },

  LEADERBOARD: {
    GET_GLOBAL: "/leaderboard/global",
    GET_CATEGORY: (category) => `/leaderboard/category/${category}`,
    GET_WEEKLY: "/leaderboard/weekly",
    GET_MONTHLY: "/leaderboard/monthly",
  },

  CATEGORIES: {
    GET_ALL: "/categories",
    GET_BY_ID: (id) => `/categories/${id}`,
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const API_MESSAGES = {
  SUCCESS: "Success",
  ERROR: "An error occurred",
  UNAUTHORIZED: "Unauthorized access",
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Validation failed",
  SERVER_ERROR: "Internal server error",
};
