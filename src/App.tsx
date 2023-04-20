import React from "react";

import { Field, Form } from "./components";

export function App() {
  return (
    <Form defaultValue={{ name: "Kevin" }}>
      <Field.String label="Name" name="name" />
      <Field.Date label="Date" name="birthdate" path="meta.birthdate" />
      <Field.Native
        label="Major"
        name="major"
        path="meta.major"
        type="checkbox"
        data-test-id={"major-checkbox"}
        labelPlacement="after"
      />
    </Form>
  );
}
