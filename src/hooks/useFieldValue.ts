import _ from "lodash";

import { useFormContext } from "../contexts/FormContext";
import { EditableFieldProps, FieldValue } from "../types/field";

/**
 * Returns the field value and the function to change the field value.
 * @template FieldValueType The type of the field value.
 * @param props The props of the field.
 */
export function useFieldValue<FieldValueType>(
  props: EditableFieldProps<FieldValueType>
) {
  const formContext = useFormContext();

  const fieldValue = _.get(formContext.value, props.path ?? props.name);
  const onFieldChange = (value: FieldValue<FieldValueType>) => {
    const newValue = _.set(formContext.value, props.path ?? props.name, value);
    formContext.onChange(newValue);
  };

  return {
    value: fieldValue,
    onChange: onFieldChange,
  };
}
