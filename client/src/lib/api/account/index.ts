import type { LoginSchema } from "../../../features/account/login/loginSchema";
import { agent } from "../agent";

export const login = async (cred: LoginSchema) => {
  return await agent
    .post<LoginSchema>("/api/login?withCookies=true", cred)
    .then((response) => response.data);
};

export const getCurrentUser = async () => {
  return await agent
    .get<User>("/api/Account/user-info")
    .then((response) => response.data);
};

export const logout = async () => {
  return await agent
    .post("/api/Account/logout")
    .then((response) => response.data);
};
