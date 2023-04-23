/* eslint-disable react-hooks/rules-of-hooks,react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { PropsWithChildren, useMemo } from "react";

import { useFormContext } from "../../contexts/FormContext";
import { useRegisterField } from "../../hooks/useRegisterField";
import {
  ConformFieldOptions,
  EditableFieldProps,
  FieldComponent,
} from "../../types/field";
import { Validation } from "../Validation/Validation";

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
    const {
      labelPlacement = "before",
      singleError,
      hideError,
      errorRenderer,
    } = props;
    const { hideErrorMessages, validation } = useFormContext();
    const { fieldProps, field } = useRegisterField(props, typeof Component);
    const fieldValidation = validation.getFieldValidation(props.name);

    const showLabel = useMemo(
      () => props.label && !props.hideLabel && !options?.hideDefaultLabel,
      [props]
    );

    const WrapperComponent = !showLabel ? React.Fragment : Wrapper;
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
          <label
            htmlFor={props.id ?? props.name}
            data-field-label={props.name}
            className="conform-field-label"
          >
            {props.label} {props.required && !props.hideRequired && "*"}
          </label>
        )),
      [props]
    );

    const showValidation = useMemo(() => {
      if (hideError) return false;
      if (!field?.touched) return false;
      return !fieldValidation?.success;
    }, [field, fieldValidation, hideError]);

    return (
      <WrapperComponent className={showValidation ? "error" : undefined}>
        {labelPlacement === "before" && LabelComponent}
        <div className="conform-field-input-wrapper">{FieldComponent}</div>
        {labelPlacement === "after" && LabelComponent}
        {showValidation && !hideErrorMessages && (
          <Validation
            fieldValidation={fieldValidation}
            singleError={singleError}
            errorRenderer={errorRenderer}
          />
        )}
      </WrapperComponent>
    );
  };

const Wrapper = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={clsx("conform-field-wrapper", className)}>{children}</div>
  );
};

export { ConformField };
