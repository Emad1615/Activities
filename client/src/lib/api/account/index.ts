import type { ChangePasswordSchema } from '../../../features/account/changePassword/changePasswordSchema';
import type { LoginSchema } from '../../../features/account/login/form/loginSchema';
import type { RegisterSchema } from '../../../features/account/register/form/registerSchema';
import { agent } from '../agent';

export const login = async (cred: LoginSchema) => {
  return await agent
    .post<LoginSchema>('/login?useCookies=true', cred)
    .then((response) => response.data);
};

export const getCurrentUser = async () => {
  return await agent
    .get<User>('/Account/user-info')
    .then((response) => response.data);
};

export const logout = async () => {
  return await agent.post('/Account/logout').then((response) => response.data);
};

export const isAuthenticated = async () => {
  return await agent
    .get('/Account/is-authenticated')
    .then((response) => response.data);
};

export const createUser = async (user: RegisterSchema) => {
  await agent.post('/Account/register', user).then((response) => response.data);
};
export const resendEmailConfirmationLink = async ({
  email,
  userId,
}: {
  email?: string;
  userId?: string | null;
}) => {
  return await agent
    .get('/Account/ResendConfirmationEmail', {
      params: { email, userId },
    })
    .then((response) => response.data);
};
export const confirmEmail = async ({
  userId,
  code,
}: {
  userId: string;
  code: string;
}) => {
  return await agent
    .get('/confirmEmail', {
      params: { userId, code },
    })
    .then((response) => response.data);
};

export const changePassword = async (data: ChangePasswordSchema) => {
  return await agent
    .post('/Account/change-password', data)
    .then((response) => response.data);
};

export const forgotPassword = async ({ email }: { email: string }) => {
  return await agent
    .post('/forgotPassword', { email })
    .then((response) => response.data);
};
export const resetPassword = async (data: ResetPassword) => {
  await agent.post('/resetPassword', data).then((response) => response.data);
};

export const loginWithGitHub = async (code: string) => {
  return await agent
    .post(`/Account/github-login?code=${code}`)
    .then((response) => response.data);
};
