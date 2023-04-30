import { useMemo } from "react";

import { useFormContext } from "../contexts/FormContext";
import { EditableFieldProps } from "../types";
import { buildFieldProps } from "../utils/field-props";
import { useFieldValue } from "./useFieldValue";

/**
 * Returns the field props.
 * @param props The base props of the field.
 * @returns The field props.
 */
export function useFieldProps<FieldValueType, CustomFieldProps>(
  props: EditableFieldProps<FieldValueType, CustomFieldProps>
) {
  const formContext = useFormContext();
  const { value, onChange } = useFieldValue(props);

  const onBlur = () => {
    formContext.fields.setTouched(props.name, true);

    if (
      formContext.validation.strategy === "blur" ||
      formContext.validation.strategy === "both"
    ) {
      formContext.validation.validate();
    }

    props.onBlur?.();
  };

  const fieldProps = useMemo(() => {
    return buildFieldProps(props);
  }, [props]);

  return {
    ...fieldProps,
    value,
    onChange,
    onBlur,
  };
}
