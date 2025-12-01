import z from 'zod';
import { requiredInput } from '../../../lib/utils/helper';

export const changePasswordSchema = z
  .object({
    currentPassword: requiredInput('Current Password'),
    newPassword: requiredInput('New Password'),
    confirmPassword: requiredInput('Confirm Password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
