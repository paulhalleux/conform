/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useFormContext } from "../context/FormContext";
import { EditableFieldProps } from "../types/field";
import { useFieldProps } from "./useFieldProps";

/**
 * Registers the field in the form context.
 * @param props The props of the field.
 * @param fieldType The type of the field.
 * @returns The field props.
 */
export function useRegisterField<FieldValueType, CustomFieldProps>(
  props: EditableFieldProps<FieldValueType, CustomFieldProps>,
  fieldType: string
) {
  const formContext = useFormContext();
  const fieldProps = useFieldProps(props);

  useEffect(
    () =>
      formContext.fields.registerField(props.name, {
        name: props.name,
        touched: false,
        path: props.path ?? props.name,
        error: null,
        type: fieldType,
      }),
    [props.name, props.path]
  );

  return { fieldProps };
}
