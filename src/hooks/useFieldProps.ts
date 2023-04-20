import { useMemo } from "react";

import { EditableFieldProps } from "../types/field";
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
  const { value, onChange } = useFieldValue(props);

  const fieldProps = useMemo(() => {
    return buildFieldProps(props);
  }, [props]);

  return {
    ...fieldProps,
    value,
    onChange,
  };
}
