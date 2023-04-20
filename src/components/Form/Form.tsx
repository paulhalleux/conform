/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
} from "react";

import { FormProvider } from "../../contexts/FormContext";
import { useForm } from "../../hooks/useForm";
import { FormRef } from "../../types/form";

/**
 * The props of the form component.
 * @param FormValueType - The type of the form value
 * @param onSubmit - The callback called when the form is submitted
 * @param defaultValue - The default value of the form (partial or complete value of type `FormValueType`)
 * @param noValidate - Whether the form should not be validated
 */
type FormProps<FormValueType> = PropsWithChildren<{
  onSubmit?: (
    value: FormValueType,
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onValueChange?: (value: FormValueType) => void;
  defaultValue?: Partial<FormValueType>;
  noValidate?: boolean;
}>;

/**
 * A form component that handles the form submission, validation and error handling.
 * @param children
 */
const Form = forwardRef(
  <FormValueType,>(
    {
      children,
      defaultValue,
      onSubmit,
      onValueChange,
    }: FormProps<FormValueType>,
    ref: ForwardedRef<FormRef<FormValueType>>
  ) => {
    const form = useForm(defaultValue, onValueChange);

    /**
     * Handles the form submission.
     * <br />
     * If the form is valid, the `onSubmit` callback is called. Otherwise, the form is marked as touched.
     * <br />
     * The form submission is prevented by default.
     * @param event - The form submission event
     */
    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      form.fields.touchAll(true);
      if (onSubmit) {
        onSubmit(form.value as FormValueType, event);
      }
    };

    // Expose the form methods to the parent component
    useImperativeHandle(
      ref,
      () => ({
        setFieldValue: form.setFieldValue,
        resetForm: form.resetForm,
        fields: form.fields,
        value: (form.value as FormValueType) ?? ({} as FormValueType),
      }),
      [form.setFieldValue, form.resetForm, form.fields, form.value]
    );

    // Initial value change callback call
    useEffect(() => {
      onValueChange?.(form.value as FormValueType);
    }, []);

    return (
      <FormProvider value={form}>
        <form onSubmit={onFormSubmit} noValidate autoComplete="off">
          {children}
        </form>
      </FormProvider>
    );
  }
);

export { Form };
