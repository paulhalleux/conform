import React from "react";

import { FieldMeta } from "../../types/field";

type ValidationProps = {
  field?: FieldMeta;
  singleError?: boolean;
  errorRenderer?: (error: string) => React.ReactNode;
};

export function Validation({
  field,
  singleError,
  errorRenderer,
}: ValidationProps) {
  if (!field?.errors) return null;

  if (singleError) {
    return (
      <div className="conform-field-validation">
        <div className="conform-field-validation-error">
          {errorRenderer
            ? errorRenderer(field.errors[0].message)
            : field.errors[0].message}
        </div>
      </div>
    );
  }

  return (
    <div className="conform-field-validation">
      {field.errors.map((error) => (
        <div
          key={`${error.path}_${error.message}`}
          className="conform-field-validation-error"
        >
          {errorRenderer ? errorRenderer(error.message) : error.message}
        </div>
      ))}
    </div>
  );
}
