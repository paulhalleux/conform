import { ZodSchema } from "zod";

import { FieldMeta } from "../types";
import { FormValidationErrors, FormValidationResult } from "../types";

/**
 * Maps a Zod error path to a JSON path
 * @param path The Zod error path.
 */
export function mapZodPathToJsonPath(path: (string | number)[]) {
  return path
    .map((item) => {
      if (typeof item === "string") {
        return `.${item}`;
      }
      return `[${item}]`;
    })
    .join("")
    .replace(/^\./, "");
}

/**
 * Validates a form.
 * @param schema The schema that is used to validate the form.
 * @param value The value of the form.
 * @param fields The fields of the form.
 */
export function validateForm<FormValueType>(
  schema: ZodSchema | undefined,
  value: Partial<FormValueType>,
  fields: Record<string, FieldMeta>
): FormValidationResult {
  if (!schema) {
    return {
      success: true,
      errors: null,
    };
  }

  const result = schema.safeParse(value);
  let errors: FormValidationErrors = {};
  if (!result.success) {
    errors = result.error.issues.reduce((acc, issue) => {
      const path = mapZodPathToJsonPath(issue.path);

      const fieldErrors = acc[path]?.errors || [];
      if (fieldErrors.some((error) => error.type === issue.code)) {
        return acc;
      }

      fieldErrors.push({
        message: issue.message,
        type: issue.code,
        zodError: result.error,
      });

      return {
        ...acc,
        [path]: {
          success: false,
          errors: fieldErrors,
        },
      };
    }, {} as FormValidationErrors);
  }

  Object.keys(fields).forEach((key) => {
    if (!errors[key]) {
      errors[key] = {
        success: true,
        errors: [],
      };
    }
  });

  return {
    success: result.success,
    errors,
  };
}
