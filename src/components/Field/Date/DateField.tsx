import React from "react";

import { ConformField } from "../../ConformField";
import { Field } from "../index";

/**
 * A date field is a simple date input.
 */
const DateField = ConformField<string>((props) => (
  <Field.Native type="date" {...props} hideLabel />
));

export { DateField };
