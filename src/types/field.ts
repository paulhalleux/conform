import { ReactNode } from "react";

/**
 * The metadata of a field.
 * @property error The error message of the field.
 * @property touched Whether the field has been touched.
 */
export type FieldMeta = {
  type: string;
  name: string;
  touched: boolean;
};

/**
 * The value of a field can be of any type, but it can also be null.
 * @template Type The type of the field value.
 */
export type FieldValue<Type> = Type | null;

/**
 * The props that are passed to a field component.
 * @template FieldValueType The type of the field value.
 * @property id The id of the field.
 * @property name The name of the field.
 * @property onChange The function that is called when the field value changes.
 * @property value The value of the field.
 * @property label The label of the field.
 * @property hideRequired Whether the required indicator should be hidden.
 * @property required Whether the field is required.
 * @property disabled Whether the field is disabled.
 * @property labelRenderer The function that is called to render the label.
 * @property path The path of the field.
 * @property hideLabel Whether the label should be hidden.
 * @property labelPlacement Whether the label should be placed before or after the field.
 * @property data-test-id The data-test-id of the field.
 */
export type FieldProps<FieldValueType> = {
  id?: string;
  name: string;
  onChange: (value: FieldValue<FieldValueType>) => void;
  value: FieldValue<FieldValueType>;
  label?: string;
  hideRequired?: boolean;
  required?: boolean;
  disabled?: boolean;
  labelRenderer?: (label: string) => ReactNode;
  hideLabel?: boolean;
  labelPlacement?: "before" | "after";
  "data-test-id"?: string;
  onFocus?: () => void;
  onBlur?: () => void;
} & FieldValidationProps;

/**
 * The props that are used to define the validation rules of a field.
 * @property singleError Whether only a single error should be shown.
 * @property errorRenderer The function that is called to render the error.
 * @property hideError Whether the error should be hidden.
 */
export type FieldValidationProps = {
  singleError?: boolean;
  errorRenderer?: (error: string) => ReactNode;
  hideError?: boolean;
  noValidate?: boolean;
};

/**
 * The props that are passed to a field and editable by the user.
 * @template FieldValueType The type of the field value.
 */
export type EditableFieldProps<FieldValueType, CustomFieldProps> = Omit<
  FieldProps<FieldValueType>,
  "value" | "onChange"
> &
  CustomFieldProps & {
    onChange?: (value: FieldValue<FieldValueType>) => void;
  };

/**
 * A field component is a function that takes the props and meta and returns a JSX element.
 * The field component is responsible for rendering the field.
 * @template FieldValueType The type of the field value.
 * @template CustomFieldProps The custom props that are passed to the field component.
 * @param props The props of the field.
 * @param meta The metadata of the field.
 * @returns A JSX element.
 */
export type FieldComponent<FieldValueType, CustomFieldProps> = (
  props: FieldProps<FieldValueType> & CustomFieldProps,
  meta: FieldMeta
) => JSX.Element;

/**
 * The options that can be passed to the conformField function.
 * @property hideDefaultLabel - Whether the default label should be hidden.
 */
export type ConformFieldOptions = {
  hideDefaultLabel?: boolean;
};
