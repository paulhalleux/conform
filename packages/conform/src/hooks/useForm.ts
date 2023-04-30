import { useCallback, useState } from "react";

import { FormProps } from "../components/Form/Form";
import { useFields } from "./useFields";
import { useFormValidation } from "./useFormValidation";

/**
 * A hook that provides a form state and methods to update the form.
 * @param props The props of the form.
 */
export function useForm<FormValueType>(props: FormProps<FormValueType>) {
  const {
    defaultValue,
    schema,
    onChange: onFieldChange,
    onInvalid,
    onValid,
  } = props;

  const [value, setValue] = useState<Partial<FormValueType>>(
    defaultValue ? { ...defaultValue } : {}
  );

  const fields = useFields();
  const validation = useFormValidation(
    fields,
    value,
    schema,
    onValid,
    onInvalid,
    props.validationStrategy
  );

  /**
   * Sets the value of the form.
   * @param value The value of the form. This value is merged with the current value of the form.
   * @returns void
   */
  const onChange = useCallback(
    (partial: Partial<FormValueType>) => {
      const newForm = { ...value, ...partial };
      setValue(newForm);
      onFieldChange?.(newForm);
      validation.validate();
    },
    [onFieldChange, validation, value]
  );

  /**
   * Sets the value of a field.
   * @param name The name of the field.
   * @param value The value of the field.
   * @returns void
   */
  const setFieldValue = useCallback(
    (name: keyof FormValueType, value: FormValueType[keyof FormValueType]) => {
      setValue((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    },
    []
  );

  /**
   * Resets the form to the default values.
   * <br />
   * if no default values are provided, the form is reset to an empty object.
   * @returns void
   */
  const resetForm = useCallback(() => {
    setValue(defaultValue ? { ...defaultValue } : {});
  }, [defaultValue]);

  return {
    value,
    onChange,
    setFieldValue,
    resetForm,
    fields,
    schema,
    validation,
    hideErrorMessages: props.hideErrorMessages,
  };
}
