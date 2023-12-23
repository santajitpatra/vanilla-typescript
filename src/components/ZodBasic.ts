import { z } from "zod";

const hobbies = ["Programming", "Weigh Lifting", "Guitar"] as const;

const UserSchema = z
  .object({
    username: z.string().min(3),
    age: z.number().default(Math.random),
    birthday: z.date(),
    isProgrammer: z.literal(true),
    // hobby: z.enum(["Programming", "Weigh Lifting", "Guitar"]),
    hobby: z.enum(hobbies),
    friends: z.array(z.string())
    // .nonempty()
  })
  // .strict()
  // .passthrough()
  // .merge(z.object({ name: z.string()}))
  // .extend({ name: z.string() });
// .deepPartial()
// .omit({age: true})
// .pick({username: true})

// extract the inferred type
type User = z.infer<typeof UserSchema>;

const user: User = {
  username: "SSG",
  age: 0,
  birthday: new Date(),
  isProgrammer: true,
  hobby: "Programming",
  // name: "",
  // bangla: "santa"
  friends: ["bala", "7", "MM"],
};

console.log(UserSchema.partial().parse(user));
// console.log(UserSchema.safeParse(user).success);
