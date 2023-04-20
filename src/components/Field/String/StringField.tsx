import React from "react";

import { ConformField } from "../../ConformField";
import { Field } from "../index";

/**
 * A string field is a simple text input.
 */
const StringField = ConformField<string>((props) => (
  <Field.Native type="text" {...props} hideLabel />
));

export { StringField };
