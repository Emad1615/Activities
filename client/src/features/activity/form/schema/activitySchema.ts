import { z } from "zod";
import { requiredInput } from "../../../../lib/utils/helper";
export const activitySchema = z.object({
  title: requiredInput("Title"),
  description: requiredInput("Description"),
  category: requiredInput("Category"),
  date: z.coerce.date({
    message: "Date is required",
  }),
  location: z.object({
    venue: requiredInput("Venue"),
    city: z.string().optional(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
});
export type ActivitySchema = z.infer<typeof activitySchema>;
// export type ActivitySchema = z.output<typeof activitySchema>;

