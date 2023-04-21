import React from "react";

import { ConformField } from "../../ConformField";

/**
 * A date field is a simple date input.
 */
const DateField = ConformField<string>(({ value, onChange, ...props }) => {
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="date"
      onChange={onFieldChange}
      value={value ?? ""}
      {...props}
    />
  );
});

export { DateField };
