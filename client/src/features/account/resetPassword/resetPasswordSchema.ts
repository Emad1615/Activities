import z from 'zod';
import { requiredInput } from '../../../lib/utils/helper';

export const resetPasswordSchema = z
  .object({
    newPassword: requiredInput('New Password'),
    confirmPassword: requiredInput('Confirm Password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
