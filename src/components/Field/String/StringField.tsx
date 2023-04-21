import React from "react";

import { ConformField } from "../../ConformField";

/**
 * A string field is a simple text input.
 */
const StringField = ConformField<string>(({ value, onChange, ...props }) => {
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      onChange={onFieldChange}
      value={value ?? ""}
      {...props}
    />
  );
});

export { StringField };
