// Custom error types
export class TodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TodoError';
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Helper function to determine if an error is a specific type
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

// Helper to format error messages for display
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

// Helper to log errors with standardized format
export function logError(error: unknown, context: string = ''): void {
  const errorMessage = getErrorMessage(error);
  const timestamp = new Date().toISOString();
  
  console.error(`[${timestamp}] ${context ? `[${context}] ` : ''}Error: ${errorMessage}`);
  
  if (error instanceof Error && error.stack) {
    console.error(error.stack);
  }
} 