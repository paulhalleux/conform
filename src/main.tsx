import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import { Field, Form } from "./components";

const App = () => {
  const [latestValue, setLatestValue] = useState<any>({});

  return (
    <Form defaultValue={{ name: "Kevin" }} onValueChange={setLatestValue}>
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
      <pre>
        <code>{JSON.stringify(latestValue, null, 2)}</code>
      </pre>
    </Form>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
