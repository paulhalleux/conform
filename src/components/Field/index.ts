import { DateField } from "./Date";
import { NativeField } from "./Native";
import { StringField } from "./String";

const Field = {
  String: StringField,
  Date: DateField,
  Native: NativeField,
};

export { Field };
