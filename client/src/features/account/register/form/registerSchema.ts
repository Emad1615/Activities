import z from "zod";
import { requiredInput } from "../../../../lib/utils/helper";

export const registerSchema=z.object({
    displayName:requiredInput('Name'),
    email:z.string().nonempty({error:'Email is required'}).email(),
    password:requiredInput('Password'),
    confirmPassword:requiredInput('Confirm Password')
}).refine((data)=> data.password===data.confirmPassword,{
    error: "Passwords do not match",
    path:['confirmPassword']
})
export type RegisterSchema=z.infer<typeof registerSchema>