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
import { FormRef } from "../../types";
import { FormValidationErrors } from "../../types";
import { ForwardedComponent } from "../../types/utils";

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
  onInvalidSubmit?: () => void;
  defaultValue?: Partial<FormValueType>;
  schema?: z.ZodSchema<FormValueType>;
  hideErrorMessages?: boolean;
  className?: string;
  validationStrategy?: "blur" | "submit" | "both";
}>;

/**
 * A form component that handles the form submission, validation and error handling.
 * @param props
 * @param ref
 */
function Form<FormValueType>(
  props: FormProps<FormValueType>,
  ref: ForwardedRef<FormRef<FormValueType>>
) {
  const { onSubmit, children, className, validationStrategy = "both" } = props;
  const form = useForm({ ...props, validationStrategy });

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
    let valid = true;

    if (validationStrategy === "submit" || validationStrategy === "both") {
      valid = form.validation.validate({ force: true });
    }

    if (onSubmit && valid) {
      onSubmit(form.value as FormValueType, event);
    } else if (!valid) {
      props.onInvalidSubmit?.();
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

const ForwardedForm = forwardRef(Form) as ForwardedComponent<
  FormProps<any>,
  FormRef<any>
>;

export { ForwardedForm as Form };
