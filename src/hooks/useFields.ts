import { useState } from "react";

import { FieldMeta } from "../types/field";

export function useFields() {
  const [fields, setFields] = useState<Record<string, FieldMeta>>({});

  /**
   * Get a field by name.
   * @param name The name of the field.
   * @returns FieldMeta
   */
  const getField = (name: string) => fields[name];

  /**
   * Check if a field exists.
   * @param name The name of the field.
   * @returns boolean
   */
  const hasField = (name: string) => !!fields[name];

  /**
   * Register a field.
   * @param name The name of the field.
   * @param metadata The metadata of the field.
   * @returns void
   */
  const registerField = (name: string, metadata: FieldMeta) => {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: metadata,
    }));

    return () => removeField(name);
  };

  /**
   * Remove a field.
   * @param name The name of the field.
   * @returns void
   */
  const removeField = (name: string) => {
    setFields((prevFields) => {
      const { [name]: _, ...rest } = prevFields;
      return rest;
    });
  };

  /**
   * Update the metadata of a field.
   * @param name The name of the field.
   * @param metadata The metadata of the field.
   * @returns void
   */
  const updateField = (name: string, metadata: Partial<FieldMeta>) => {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: {
        ...prevFields[name],
        ...metadata,
      },
    }));
  };

  /**
   * Set the touched state of a field.
   * @param name The name of the field.
   * @param touched The touched state of the field.
   * @returns void
   */
  const setTouched = (name: string, touched: boolean) => {
    updateField(name, { touched });
  };

  /**
   * Set the touched state of all fields to true.
   * @returns void
   */
  const touchAll = (touched: boolean) => {
    Object.keys(fields).forEach((name) => {
      setTouched(name, touched);
    });
  };

  return {
    fields,
    getField,
    hasField,
    registerField,
    removeField,
    updateField,
    setTouched,
    touchAll,
  };
}
