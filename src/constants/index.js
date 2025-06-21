// Main constants index file
// Export all constants from a single location for easy importing

// API Constants
export * from "./api.js";

// Application Constants
export * from "./app.js";

// Routes Constants
export * from "./routes.js";

// Re-export commonly used constants for convenience
export { API_CONFIG, ENDPOINTS, HTTP_STATUS, API_MESSAGES } from "./api.js";

export {
  APP_CONFIG,
  QUIZ_CATEGORIES,
  DIFFICULTY_LEVELS,
  USER_ROLES,
  THEMES,
  LANGUAGES,
  ERROR_TYPES,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} from "./app.js";

export {
  ROUTES,
  ROUTE_PARAMS,
  ROUTE_GUARDS,
  NAVIGATION_MENU,
  BREADCRUMB_CONFIG,
} from "./routes.js";
