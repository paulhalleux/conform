import { createContext, useContext } from "react";

import { useForm } from "../hooks/useForm";

export type FormContextType = ReturnType<typeof useForm>;

export const FormContext = createContext<FormContextType>(
  {} as FormContextType
);

export const FormProvider = FormContext.Provider;

/**
 * A hook that returns the form contexts.
 * @returns The form contexts
 * @throws An error if the hook is used outside a `FormProvider` component
 */
export function useFormContext() {
  try {
    return useContext(FormContext);
  } catch (error) {
    throw new Error(
      "The `useFormContext` hook must be used within a `FormProvider` component."
    );
  }
}
