import { useState } from "react";
import z from "zod";

import { ValidationError } from "../types/validation";
import { mapZodPathToJsonPath } from "../utils/validation";
import { useFields } from "./useFields";

/**
 * A hook that provides a form state and methods to update the form validation.
 * @param fields The fields that are used to validate the form.
 * @param schema The schema that is used to validate the form.
 * @param onValid A callback that is called when the form is valid.
 * @param onInvalid A callback that is called when the form is invalid.
 */
export function useFormValidation<FormValueType>(
  fields: ReturnType<typeof useFields>,
  schema?: z.ZodSchema<FormValueType>,
  onValid?: () => void,
  onInvalid?: (errors: ValidationError[]) => void
) {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validate = (value: Partial<FormValueType>) => {
    if (!schema) return;

    const result = schema.safeParse(value);
    if (result.success) {
      setErrors([]);
      onValid?.();

      Object.keys(fields.fields).forEach((fieldName) =>
        fields.updateField(fieldName, { errors: null })
      );

      return;
    }

    const mappedErrors = result.error.issues.map((issue) => ({
      path: mapZodPathToJsonPath(issue.path),
      message: issue.message,
    }));

    Object.keys(fields.fields).forEach((fieldName) => {
      const fieldErrors = mappedErrors.filter(
        (error) => error.path === fieldName
      );

      if (fieldErrors.length > 0 && !fields.fields[fieldName].noValidate) {
        fields.updateField(fieldName, { errors: fieldErrors });
        return;
      }

      fields.updateField(fieldName, { errors: null });
    });

    setErrors(mappedErrors);
    onInvalid?.(mappedErrors);
  };

  return {
    errors,
    validate,
  };
}
