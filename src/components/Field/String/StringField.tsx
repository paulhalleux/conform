import React from "react";

import { omitNonHtmlProps } from "../../../utils/field-props";
import { ConformField } from "../../ConformField";

/**
 * A string field is a simple text input.
 */
const StringField = ConformField<string>(({ value, onChange, ...props }) => {
  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const fieldProps = omitNonHtmlProps(props);

  return (
    <input
      type="text"
      onChange={onFieldChange}
      value={value ?? ""}
      {...fieldProps}
    />
  );
});

export { StringField };
