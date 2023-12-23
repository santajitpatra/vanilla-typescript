import { z } from "zod";

const hobbies = ["Programming", "Weigh Lifting", "Guitar"] as const;

const UserSchema = z.object({
  uid: z.discriminatedUnion("status", [
    z.object({status: z.literal("success"), date: z.string()}),
    z.object({status: z.literal("failed"), date: z.instanceof(Error)})
  ]),
  id: z.string().or(z.number()),
  // id: z.union([z.string(), z.number()]),
  username: z.string().min(3),
  age: z.number().default(Math.random),
  birthday: z.date(),
  isProgrammer: z.literal(true),
  // hobby: z.enum(["Programming", "Weigh Lifting", "Guitar"]),
  hobby: z.enum(hobbies),
  friends: z.array(z.string()),
  // .nonempty()
  coords: z.tuple([z.string(), z.date()]).rest(z.number()),
});
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
  uid: {status: "success" ,date: "fdgdstdh"} , 
  id: "kkjhnhj",
  username: "SSG",
  age: 0,
  birthday: new Date(),
  isProgrammer: true,
  hobby: "Programming",
  // name: "",
  // bangla: "santa"
  friends: ["bala", "7", "MM"],
  coords: ["test", new Date(), 4, 4, 4, 44, 446],
};

console.log(UserSchema.partial().parse(user));
// console.log(UserSchema.safeParse(user).success);
