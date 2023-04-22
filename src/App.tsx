import "./styles/default.css";
import "./index.css";

import React from "react";
import z from "zod";

import { Field, Form } from "./components";

const Schema = z.object({
  names: z.array(z.string().min(3).max(10).includes("a")),
});

export function App() {
  return (
    <Form schema={Schema} className="form">
      {Array.from({ length: 5 }).map((_, index) => (
        <Field.String
          key={`name-${index}`}
          name={`names[${index}]`}
          label={`Name ${index + 1}`}
          singleError
        />
      ))}
    </Form>
  );
}
