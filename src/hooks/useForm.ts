import { useCallback, useState } from "react";

import { useFields } from "./useFields";

/**
 * A hook that provides a form state and methods to update the form.
 * @param defaultValue The default value of the form.
 */
export function useForm<FormValueType>(defaultValue?: Partial<FormValueType>) {
  const fields = useFields();
  const [value, setValue] = useState<Partial<FormValueType>>(
    defaultValue || {}
  );

  /**
   * Sets the value of the form.
   * @param value The value of the form. This value is merged with the current value of the form.
   * @returns void
   */
  const onChange = useCallback((value: Partial<FormValueType>) => {
    setValue((prevForm) => ({ ...prevForm, ...value }));
  }, []);

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
    setValue(defaultValue || {});
  }, [defaultValue]);

  return {
    value,
    onChange,
    setFieldValue,
    resetForm,
    fields,
  };
}
