import React from "react";

import { FieldValidationResult } from "../../types/validation";

type ValidationProps = {
  fieldValidation: FieldValidationResult;
  singleError?: boolean;
  errorRenderer?: (error: string) => React.ReactNode;
};

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
            ? errorRenderer(fieldValidation.errors[0].message)
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
          {errorRenderer ? errorRenderer(error.message) : error.message}
        </div>
      ))}
    </div>
  );
}
