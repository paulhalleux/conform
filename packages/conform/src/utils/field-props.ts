import _ from "lodash";

import { EditableFieldProps } from "../types";

/**
 * Builds the field props.
 * @param props The props of the field.
 * @returns The field props.
 */
export function buildFieldProps<FieldValueType, CustomFieldProps>(
  props: EditableFieldProps<FieldValueType, CustomFieldProps>
) {
  if (!props.id) {
    props = {
      ...props,
      id: props.name,
    };
  }

  return props;
}

/**
 * Omit the props that are not meant to be passed to the html field.
 * @param props The props of the field.
 */
export function omitNonHtmlProps<FieldValueType, CustomFieldProps>(
  props: EditableFieldProps<FieldValueType, CustomFieldProps>
) {
  return _.omit(props, [
    "hideLabel",
    "hideRequired",
    "labelRenderer",
    "labelPlacement",
    "singleError",
  ]);
}
