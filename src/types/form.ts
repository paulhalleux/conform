import { useFields } from "../hooks/useFields";

/**
 * FormRef is a type that is used to define the form reference
 * @template FormValueType The type of the form value.
 * @property setFieldValue The function that is called to set the value of a field.
 * @property resetForm The function that is called to reset the form.
 * @property fields The fields of the form.
 */
export type FormRef<FormValueType> = {
  setFieldValue: (
    name: keyof FormValueType,
    value: FormValueType[keyof FormValueType]
  ) => void;
  resetForm: () => void;
  fields: ReturnType<typeof useFields>;
  value: Partial<FormValueType>;
};
