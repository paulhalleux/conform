import { ZodError } from "zod";

/**
 * A validation error.
 * @property message The error message.
 * @property type The type of the error.
 * @property zodError The zod error.
 */
export type ValidationError = {
  message: string;
  type: string;
  zodError: ZodError;
};

/**
 * The result of a field validation.
 * @property success Whether the field is valid.
 * @property errors The errors of the field.
 */
export type FieldValidationResult = {
  success: boolean;
  errors: ValidationError[] | null;
};

/**
 * The result of a form validation.
 * @property success Whether the form is valid.
 * @property errors The errors of the form.
 */
export type FormValidationResult = {
  success: boolean;
  errors: FormValidationErrors | null;
};

/**
 * The errors of a form.
 */
export type FormValidationErrors = {
  [key: string]: FieldValidationResult;
};
