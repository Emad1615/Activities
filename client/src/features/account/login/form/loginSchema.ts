import { z } from 'zod';
import { requiredInput } from '../../../../lib/utils/helper';
export const loginSchema = z.object({
  email: z.string().nonempty().email(),
  password: requiredInput('Password'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
