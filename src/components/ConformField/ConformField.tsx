/* eslint-disable react-hooks/rules-of-hooks,react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useEffect } from "react";

import { useFormContext } from "../../context/FormContext";
import {
  ConformFieldOptions,
  EditableFieldProps,
  FieldComponent,
  FieldValue,
} from "../../types/field";

/**
 * A HOC that wraps a field component and registers it to the form context.
 * @param Component - The field component to wrap
 * @param options - The options of the field
 */
const ConformField =
  <FieldValueType, CustomFieldProps = {}>(
    Component: FieldComponent<FieldValueType, CustomFieldProps>,
    options?: ConformFieldOptions
  ) =>
  (props: EditableFieldProps<FieldValueType> & CustomFieldProps) => {
    const formContext = useFormContext();

    useEffect(
      () =>
        formContext.fields.registerField(props.name, {
          name: props.name,
          touched: false,
          path: props.path ?? props.name,
          error: null,
          type: typeof Component,
        }),
      []
    );

    const fieldValue = _.get(formContext.value, props.path ?? props.name);
    const onFieldChange = (value: FieldValue<FieldValueType>) => {
      const newValue = _.set(
        formContext.value,
        props.path ?? props.name,
        value
      );
      formContext.onChange(newValue);
    };

    const showLabel =
      props.label && !props.hideLabel && !options?.hideDefaultLabel;
    const WrapperComponent = !showLabel ? React.Fragment : "div";
    const fieldProps = _.omit(props, [
      "path",
    ]) as EditableFieldProps<FieldValueType> & CustomFieldProps;

    return (
      <WrapperComponent>
        {showLabel &&
          (props.labelRenderer ? (
            props.labelRenderer(props.label!)
          ) : (
            <label
              htmlFor={props.id ?? props.name}
              data-field-label={props.name}
            >
              {props.label} {props.required && !props.hideRequired && "*"}
            </label>
          ))}
        <Component
          {...fieldProps}
          data-field={props.name}
          onChange={(value: FieldValue<FieldValueType>) => onFieldChange(value)}
          value={fieldValue}
        />
      </WrapperComponent>
    );
  };

export { ConformField };
