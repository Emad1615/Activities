import type { LoginSchema } from "../../../features/account/login/form/loginSchema";
import type { RegisterSchema } from "../../../features/account/register/form/registerSchema";
import { agent } from "../agent";

export const login = async (cred: LoginSchema) => {
  return await agent
    .post<LoginSchema>("/login?useCookies=true", cred)
    .then((response) => response.data);
};

export const getCurrentUser = async () => {
  return await agent
    .get<User>("/Account/user-info")
    .then((response) => response.data);
};

export const logout = async () => {
  return await agent
    .post("/Account/logout")
    .then((response) => response.data);
};

export  const isAuthenticated= async()=>{
  return await agent.get('/Account/is-authenticated').then((response)=>response.data)
}

export const  createUser=async(user:RegisterSchema)=>{
  await agent.post('/Account/register',user).then((response)=>response.data)
}