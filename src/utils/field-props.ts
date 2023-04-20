import _ from "lodash";

import { EditableFieldProps } from "../types/field";

/**
 * Builds the field props.
 * @param props The props of the field.
 * @returns The field props.
 */
export function buildFieldProps<FieldValueType, CustomFieldProps>(
  props: EditableFieldProps<FieldValueType, CustomFieldProps>
) {
  // avoid exposing the path prop to the field
  let fieldProps = _.omit(props, ["path"]) as EditableFieldProps<
    FieldValueType,
    CustomFieldProps
  >;

  if (!fieldProps.id) {
    fieldProps = {
      ...fieldProps,
      id: props.name,
    };
  }

  return fieldProps;
}
