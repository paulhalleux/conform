/* eslint-disable react-hooks/rules-of-hooks,react-hooks/exhaustive-deps */
import React, { useMemo } from "react";

import { useRegisterField } from "../../hooks/useRegisterField";
import {
  ConformFieldOptions,
  EditableFieldProps,
  FieldComponent,
} from "../../types/field";

/**
 * A HOC that wraps a field component and registers it to the form contexts.
 * @param Component - The field component to wrap
 * @param options - The options of the field
 */
const ConformField =
  <FieldValueType, CustomFieldProps = {}>(
    Component: FieldComponent<FieldValueType, CustomFieldProps>,
    options?: ConformFieldOptions
  ) =>
  (props: EditableFieldProps<FieldValueType, CustomFieldProps>) => {
    const { labelPlacement = "before" } = props;
    const { fieldProps } = useRegisterField(props, typeof Component);

    const showLabel = useMemo(
      () => props.label && !props.hideLabel && !options?.hideDefaultLabel,
      [props]
    );

    const WrapperComponent = !showLabel ? React.Fragment : "div";
    const FieldComponent = useMemo(
      () => <Component data-field={props.name} {...fieldProps} />,
      [fieldProps]
    );
    const LabelComponent = useMemo(
      () =>
        showLabel &&
        (props.labelRenderer ? (
          props.labelRenderer(props.label!)
        ) : (
          <label htmlFor={props.id ?? props.name} data-field-label={props.name}>
            {props.label} {props.required && !props.hideRequired && "*"}
          </label>
        )),
      [props]
    );

    return (
      <WrapperComponent>
        {labelPlacement === "before" && LabelComponent}
        {FieldComponent}
        {labelPlacement === "after" && LabelComponent}
      </WrapperComponent>
    );
  };

export { ConformField };
