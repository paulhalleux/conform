import { useState } from "react";
import z from "zod";

import {
  FieldValidationResult,
  FormValidationErrors,
  FormValidationResult,
} from "../types/validation";
import { validateForm } from "../utils/validation";
import { useFields } from "./useFields";

/**
 * A hook that provides a form state and methods to update the form validation.
 * @param fields The fields that are used to validate the form.
 * @param value The value of the form.
 * @param schema The schema that is used to validate the form.
 * @param onValid A callback that is called when the form is valid.
 * @param onInvalid A callback that is called when the form is invalid.
 */
export function useFormValidation<FormValueType>(
  fields: ReturnType<typeof useFields>,
  value: Partial<FormValueType>,
  schema?: z.ZodSchema<FormValueType>,
  onValid?: () => void,
  onInvalid?: (errors: FormValidationErrors) => void
) {
  const [validationState, setValidationState] = useState<FormValidationResult>({
    success: true,
    errors: null,
  });

  /**
   * Validates a form.
   */
  const validate = () => {
    const result = validateForm(schema, value, fields.fields);
    setValidationState(result);

    if (result.success) {
      onValid?.();
    } else {
      onInvalid?.(result.errors || {});
    }

    return result.success;
  };

  /**
   * Resets the form validation.
   * @returns void
   */
  const resetValidation = () => {
    setValidationState({
      success: true,
      errors: null,
    });
  };

  /**
   * Gets the validation result of a field.
   * @param name The name of the field.
   * @returns The validation result of the field.
   */
  const getFieldValidation = (name: string): FieldValidationResult =>
    validationState.errors?.[name] || {
      success: true,
      errors: null,
    };

  return {
    validate,
    validationState,
    resetValidation,
    getFieldValidation,
  };
}
