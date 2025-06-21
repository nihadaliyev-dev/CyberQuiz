// Application Routes Constants
export const ROUTES = {
  // Public Routes
  PUBLIC: {
    HOME: "/",
    ABOUT: "/about",
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_OF_SERVICE: "/terms-of-service",
  },

  // Quiz Routes
  QUIZ: {
    LIST: "/quiz",
    CATEGORY: (category) => `/quiz/category/${category}`,
    DIFFICULTY: (difficulty) => `/quiz/difficulty/${difficulty}`,
    START: (quizId) => `/quiz/${quizId}/start`,
    QUESTION: (quizId, questionIndex) =>
      `/quiz/${quizId}/question/${questionIndex}`,
    RESULTS: (quizId) => `/quiz/${quizId}/results`,
    REVIEW: (quizId) => `/quiz/${quizId}/review`,
  },

  // User Routes (Protected)
  USER: {
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    SETTINGS: "/settings",
    HISTORY: "/history",
    SCORES: "/scores",
    FAVORITES: "/favorites",
    PROGRESS: "/progress",
  },

  // Leaderboard Routes
  LEADERBOARD: {
    GLOBAL: "/leaderboard",
    CATEGORY: (category) => `/leaderboard/category/${category}`,
    WEEKLY: "/leaderboard/weekly",
    MONTHLY: "/leaderboard/monthly",
    PERSONAL: "/leaderboard/personal",
  },

  // Admin Routes (Admin Only)
  ADMIN: {
    DASHBOARD: "/admin",
    USERS: "/admin/users",
    QUIZZES: "/admin/quizzes",
    CATEGORIES: "/admin/categories",
    REPORTS: "/admin/reports",
    SETTINGS: "/admin/settings",
  },

  // Instructor Routes (Instructor Only)
  INSTRUCTOR: {
    DASHBOARD: "/instructor",
    CREATE_QUIZ: "/instructor/create-quiz",
    MY_QUIZZES: "/instructor/my-quizzes",
    STUDENT_PROGRESS: "/instructor/student-progress",
    ANALYTICS: "/instructor/analytics",
  },
};

// Route Parameters
export const ROUTE_PARAMS = {
  QUIZ_ID: ":quizId",
  QUESTION_INDEX: ":questionIndex",
  CATEGORY: ":category",
  DIFFICULTY: ":difficulty",
  USER_ID: ":userId",
};

// Route Guards
export const ROUTE_GUARDS = {
  PUBLIC: "public",
  AUTHENTICATED: "authenticated",
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  STUDENT: "student",
};

// Navigation Menu Items
export const NAVIGATION_MENU = {
  MAIN: [
    { label: "Home", path: ROUTES.PUBLIC.HOME, icon: "home" },
    { label: "Quiz", path: ROUTES.QUIZ.LIST, icon: "quiz" },
    {
      label: "Leaderboard",
      path: ROUTES.LEADERBOARD.GLOBAL,
      icon: "leaderboard",
    },
    { label: "About", path: ROUTES.PUBLIC.ABOUT, icon: "info" },
  ],

  USER: [
    { label: "Dashboard", path: ROUTES.USER.DASHBOARD, icon: "dashboard" },
    { label: "Profile", path: ROUTES.USER.PROFILE, icon: "person" },
    { label: "History", path: ROUTES.USER.HISTORY, icon: "history" },
    { label: "Settings", path: ROUTES.USER.SETTINGS, icon: "settings" },
  ],

  ADMIN: [
    { label: "Admin Dashboard", path: ROUTES.ADMIN.DASHBOARD, icon: "admin" },
    { label: "Users", path: ROUTES.ADMIN.USERS, icon: "users" },
    { label: "Quizzes", path: ROUTES.ADMIN.QUIZZES, icon: "quiz" },
    { label: "Reports", path: ROUTES.ADMIN.REPORTS, icon: "reports" },
  ],

  INSTRUCTOR: [
    {
      label: "Instructor Dashboard",
      path: ROUTES.INSTRUCTOR.DASHBOARD,
      icon: "instructor",
    },
    {
      label: "Create Quiz",
      path: ROUTES.INSTRUCTOR.CREATE_QUIZ,
      icon: "create",
    },
    {
      label: "My Quizzes",
      path: ROUTES.INSTRUCTOR.MY_QUIZZES,
      icon: "my-quizzes",
    },
    {
      label: "Analytics",
      path: ROUTES.INSTRUCTOR.ANALYTICS,
      icon: "analytics",
    },
  ],
};

// Breadcrumb Configuration
export const BREADCRUMB_CONFIG = {
  [ROUTES.PUBLIC.HOME]: [{ label: "Home", path: ROUTES.PUBLIC.HOME }],
  [ROUTES.QUIZ.LIST]: [
    { label: "Home", path: ROUTES.PUBLIC.HOME },
    { label: "Quiz", path: ROUTES.QUIZ.LIST },
  ],
  [ROUTES.USER.DASHBOARD]: [
    { label: "Home", path: ROUTES.PUBLIC.HOME },
    { label: "Dashboard", path: ROUTES.USER.DASHBOARD },
  ],
  [ROUTES.LEADERBOARD.GLOBAL]: [
    { label: "Home", path: ROUTES.PUBLIC.HOME },
    { label: "Leaderboard", path: ROUTES.LEADERBOARD.GLOBAL },
  ],
};
