import React from "react";

import { ConformField } from "../../ConformField";
import { NativeField } from "../Native";

/**
 * A string field is a simple text input.
 */
const StringField = ConformField<string>((props) => (
  <NativeField type="text" {...props} hideLabel />
));

export { StringField };
