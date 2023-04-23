import { DateField } from "./Date";
import { NativeField } from "./Native";
import { StringField } from "./String";

const Field = {
  Native: NativeField,
  String: StringField,
  Date: DateField,
};

export { Field };
