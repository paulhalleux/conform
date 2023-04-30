import React, { HTMLProps, useMemo } from "react";

import { FieldProps, FieldValue } from "../../../types";
import { omitNonHtmlProps } from "../../../utils/field-props";
import { ConformField } from "../../ConformField";

type NativeFieldValueType = HTMLProps<HTMLInputElement>["value"] | boolean;

/**
 * Props of a native input field minus
 * the common field props.
 */
type NativeFieldProps = Omit<
  HTMLProps<HTMLInputElement>,
  keyof FieldProps<any>
> & {
  defaultValue?: NativeFieldValueType;
};

/**
 * A native field is a wrapped native html input.
 */
const NativeField = ConformField<NativeFieldValueType, NativeFieldProps>(
  ({ onChange, value, type = "text", defaultValue, ...props }) => {
    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "checkbox") {
        onChange(event.target.checked);
      } else {
        onChange(event.target.value);
      }
    };

    const fieldProps = useMemo(() => omitNonHtmlProps(props), [props]);

    return (
      <input
        type={type}
        onChange={onFieldChange}
        {...getDefaultValue(type, value, defaultValue)}
        {...fieldProps}
      />
    );
  }
);

/**
 * Returns the default value of a native field.
 * @param type - The type of the field
 * @param value - The current value of the field
 * @param defaultValue - The default value of the field
 */
const getDefaultValue = (
  type: string,
  value: FieldValue<NativeFieldValueType>,
  defaultValue?: NativeFieldValueType
) => ({
  checked:
    type === "checkbox"
      ? ((value ??
          (typeof defaultValue === "boolean"
            ? defaultValue
            : false)) as boolean)
      : undefined,
  value:
    type === "checkbox" ? undefined : ((value ?? defaultValue ?? "") as string),
});

export { NativeField };
