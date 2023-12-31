import { z } from "zod";

const hobbies = ["Programming", "Weigh Lifting", "Guitar"] as const;

const UserSchema = z.object({
  uid: z.discriminatedUnion("status", [
    z.object({status: z.literal("success"), date: z.string()}),
    z.object({status: z.literal("failed"), date: z.instanceof(Error)})
  ]),
  id: z.string().or(z.number()),
  // id: z.union([z.string(), z.number()]),
  username: z.string().min(3, "min lenth must be 3"),
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

console.log(UserSchema.partial().safeParse(user));
// console.log(UserSchema.safeParse(user).success);





// 2nd Lesson
const UserRecording = z.record(z.string(), z.number())

const userRecordingData = {
  stringssss: 1,
  stringsss2: 2,
};

console.log(UserRecording.parse(userRecordingData));


// 3rd Lesson
const UserMap = z.map(z.string(), z.object({name: z.string()}));

const userMapingData = new Map([
  ["id-jhon", { name: "John" }],
  ["id-santa", { name: "santa" }],
]);

console.log(UserMap.parse(userMapingData))

// 4th Lesson
const UserSet = z.set(z.number());

const userMapingDataSet = new Set([1,1,1,1,6367,566,65,565])

console.log(UserSet.parse(userMapingDataSet))

// 5th Lesson
const PromiseSchema = z.promise(z.string());

const p = Promise.resolve("dsfsdf")

console.log(PromiseSchema.parse(p))

// 6th Lesson
const brandEmail = z
  .string()
  .email()
  .refine((val) => val.endsWith("@santajitpatra.com"), {
    message: "Email must end with @santajitpatra.com",
  });

const email = "one@santajitpatra.com";

console.log(brandEmail.parse(email))