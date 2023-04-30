import React from "react";

import { ErrorRendererFn } from "../../types";
import { FieldValidationResult } from "../../types";

type ValidationProps = {
  fieldValidation: FieldValidationResult;
  singleError?: boolean;
  errorRenderer?: ErrorRendererFn;
};

/**
 * Validation component to render the validation errors.
 * @param fieldValidation The field validation result
 * @param singleError If true, only the first error will be rendered
 * @param errorRenderer A function to render the error
 */
export function Validation({
  fieldValidation,
  singleError,
  errorRenderer,
}: ValidationProps) {
  if (fieldValidation.success || !fieldValidation.errors) return null;

  if (singleError) {
    return (
      <div className="conform-field-validation">
        <div className="conform-field-validation-error">
          {errorRenderer
            ? errorRenderer(fieldValidation.errors[0], fieldValidation.errors)
            : fieldValidation.errors[0].message}
        </div>
      </div>
    );
  }

  return (
    <div className="conform-field-validation">
      {fieldValidation.errors.map((error) => (
        <div
          key={`${error.type}_${error.message}`}
          className="conform-field-validation-error"
        >
          {errorRenderer
            ? errorRenderer(error, fieldValidation.errors || [])
            : error.message}
        </div>
      ))}
    </div>
  );
}
