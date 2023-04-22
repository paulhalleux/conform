/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
} from "react";
import { z } from "zod";

import { FormProvider } from "../../contexts/FormContext";
import { useForm } from "../../hooks/useForm";
import { FormRef } from "../../types/form";
import { FormValidationErrors } from "../../types/validation";

/**
 * The props of the form component.
 * @param FormValueType - The type of the form value
 * @param onSubmit - The callback called when the form is submitted
 * @param defaultValue - The default value of the form (partial or complete value of type `FormValueType`)
 * @param noValidate - Whether the form should not be validated
 */
export type FormProps<FormValueType> = PropsWithChildren<{
  onSubmit?: (
    value: FormValueType,
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onChange?: (value: Partial<FormValueType>) => void;
  onValid?: () => void;
  onInvalid?: (errors: FormValidationErrors) => void;
  defaultValue?: Partial<FormValueType>;
  schema?: z.ZodSchema<FormValueType>;
  hideErrorMessages?: boolean;
  className?: string;
}>;

/**
 * A form component that handles the form submission, validation and error handling.
 * @param children
 */
const Form = forwardRef(
  <FormValueType,>(
    props: FormProps<FormValueType>,
    ref: ForwardedRef<FormRef<FormValueType>>
  ) => {
    const { onSubmit, children, className } = props;
    const form = useForm(props);

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
        value: form.value,
      }),
      [form]
    );

    return (
      <FormProvider value={form}>
        <form
          className={className}
          onSubmit={onFormSubmit}
          noValidate
          autoComplete="off"
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);

export { Form };
