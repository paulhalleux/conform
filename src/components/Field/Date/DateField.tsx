import React from "react";

import { ConformField } from "../../ConformField";
import { NativeField } from "../Native";

/**
 * A date field is a simple date input.
 */
const DateField = ConformField<string>((props) => (
  <NativeField type="date" {...props} hideLabel />
));

export { DateField };
