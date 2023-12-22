import { z } from "zod";

 const hobbies = ["Programming", "Weigh Lifting", "Guitar"] as const

const UserSchema = z.object({
  username: z.string().min(3),
  age: z.number().default(Math.random),
  birthday: z.date(),
  isProgrammer: z.literal(true),
  // hobby: z.enum(["Programming", "Weigh Lifting", "Guitar"]),
  hobby: z.enum(hobbies),
});

// extract the inferred type
type User = z.infer<typeof UserSchema>;

const user: User = {
  username: "SSG",
  age: 55,
  birthday: new Date(),
  isProgrammer: true,
  hobby: "Programming",
};

console.log(UserSchema.parse(user));
// console.log(UserSchema.safeParse(user).success);
