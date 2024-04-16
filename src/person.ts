import { z } from "zod";

const name = z
  .string({
    required_error: "Please enter your name.",
    invalid_type_error: "Please enter a valid name",
    description: "name of the user.",
  })
  .refine(
    (name) => {
      return name.length >= 10;
    },
    {
      message: "Name must be at least 10 characters.",
      path: ["name"],
    }
  )
  .transform((name) => {
    return name
      .split(" ")
      .map((name) => capitalizeWord(name))
      .join(" ");
  });

const age = z
  .number({
    required_error: "Please enter your age.",
  })
  .refine((age) => age > 18, {
    message: "You must be over 18 to enter the club.",
    path: ["age"],
  });

const userSchema = z.object({
  name,
  age,
});

const validateUser = (user: unknown) => {
  const result = userSchema.safeParse(user);
  const hasFailed = result.success === false;

  if (hasFailed) {
    return result.error.issues;
  }

  return result.data;
};

console.log(validateUser({ name: "ninja hattori senzo", age: 17 }));
console.log(validateUser({ name: "ninja hattori senzo", age: 19 }));

function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
