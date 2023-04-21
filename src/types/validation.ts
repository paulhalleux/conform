/**
 * Mapped error type for Zod validation errors
 * @property path The path of the field that has an error.
 * @property message The error message.
 */
export type ValidationError = {
  path: string;
  message: string;
};
