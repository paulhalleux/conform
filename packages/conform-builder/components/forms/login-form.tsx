"use client";

import { Field, Form } from "@conform/form";

import { Button } from "@/components/ui";
import { useLogin } from "@/hooks/authentication";
import { LoginSchema } from "@/schemas/authentication";

export function LoginForm() {
  const login = useLogin();
  const onSubmit = async (values: any) => await login.mutateAsync(values);

  return (
    <Form onSubmit={onSubmit} schema={LoginSchema} validationStrategy="submit">
      <Field.Native
        autoComplete="new-email"
        type="email"
        name="email"
        placeholder="Email"
      />
      <Field.Native
        autoComplete="new-password"
        type="password"
        name="password"
        placeholder="Password"
      />
      <Button type="submit">Sign in</Button>
    </Form>
  );
}
