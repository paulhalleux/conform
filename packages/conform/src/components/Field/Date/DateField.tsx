import React from "react";

import { omitNonHtmlProps } from "../../../utils/field-props";
import { ConformField } from "../../ConformField";

/**
 * A date field is a simple date input.
 */
const DateField = ConformField<string>(({ value, onChange, ...props }) => {
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const fieldProps = omitNonHtmlProps(props);

  return (
    <input
      type="date"
      onChange={onFieldChange}
      value={value ?? ""}
      {...fieldProps}
    />
  );
});

export { DateField };
