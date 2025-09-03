import z from 'zod';
import { requiredInput } from '../../../lib/utils/helper';

export const profileFormSchema = z.object({
  displayName: requiredInput('Name'),
  gender: requiredInput('Gender'),
  birthDate: z.coerce.date({ message: 'birth date is required' }),
  bio: z.string().optional().or(z.literal('')).nullable(),
  phoneNumber: z
    .string({ message: 'Required' })
    .optional()
    .or(z.literal(''))
    .nullable(),
});
export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
