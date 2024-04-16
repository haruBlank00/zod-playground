import { ZodError, z } from "zod";

const username = z.string({
  required_error: "Please enter your name.",
  invalid_type_error: "Please enter a valid name",
  description: "name of the user.",
});

const age = z
  .number({
    required_error: "Please enter your age.",
    invalid_type_error: "Please enter a valid age.",
    description: "age of the user.",
  })
  .min(18, {
    message: "You must be over 18 to enter the club.",
  });

const termsAndConditions = z.boolean({
  invalid_type_error: "Please accept the terms and conditions.",
  required_error: "Please accept the terms and conditions.",
  description: "terms and conditions",
});

const joinedDate = z.date({
  description: "joined date",
  invalid_type_error: "Please enter a valid date.",
  required_error: "Please enter a valid date.",
});

const userSchema = z.object({
  username,
  age,
  termsAndConditions,
  joinedDate,
});

// type User = z.infer<typeof user>;
const createUser = (user: unknown) => {
  try {
    const validatedUser = userSchema.parse(user);
    console.log(validatedUser);
  } catch (e) {
    if (e instanceof ZodError) {
      const { issues } = e;
      console.error({ issues });
    }
  }
};

console.log("what?");
createUser({
  username: "John",
  age: 18,
  termsAndConditions: true,
  joinedDate: new Date(),
});

createUser({
  username: 445,
  age: 20,
  termsAndConditions: true,
  joinedDate: new Date(),
});

createUser({
  username: 445,
  age: 20,
  termsAndConditions: true,
  joinedDate: new Date(),
});

createUser({
  username: 445,
  age: 20,
  termsAndConditions: null,
  joinedDate: "lolcat",
});
