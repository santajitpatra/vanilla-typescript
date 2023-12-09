import { z } from "zod";

const UserSchema = z.object({
  username: z.string(),
});


// extract the inferred type
type User = z.infer<typeof UserSchema>;

const user: User = {username: "SSG"}

console.log(UserSchema.parse(user))