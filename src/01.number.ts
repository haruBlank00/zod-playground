import { ZodError, z } from "zod";

const ageSchema = z
  .number({
    required_error: "Age is required.",
    invalid_type_error: "Age must be a number",
  })
  .min(18, { message: "You must be over 18 to enter the club." });

// const ageValidator = (age: unknown) => {
//   return ageSchema.parse(age);
// };

// console.log(ageValidator(18));
// console.log(ageValidator(16));

const numberSchema = z
  .number({
    required_error: "Please enter a number to convert.",
    invalid_type_error: "Please enter a valid number.",
  })
  .safe();
export const toString = (num: unknown) => {
  try {
    const parsedInput = numberSchema.parse(num);
    return String(parsedInput);
  } catch (e) {
    if (e instanceof ZodError) {
      const { issues, errors, message, name } = e;

      console.error({ errors, issues, name, message });
      return "Oopsy daisy!!!";
    }
  }
};

// console.log(toString("hello"));
console.log(toString(undefined));
// console.log({ cat: "cat" });
