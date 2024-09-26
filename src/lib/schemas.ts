import { z } from 'zod';

export const StepSchema = z.object({
  title: z.string(),
  icon: z.string(),
  details: z.string(),
  completed: z.boolean().optional(),
  moneyCost: z.number().optional(),
  timeCost: z.number().optional(),
  suggestionAdjustA: z.string().optional(),
  suggestionAdjustB: z.string().optional(),
});

export const InfoSchema = z.object({
  title: z.string(),
  category: z.string(),
  type: z.string(),
})

export const ResponseSchema = z.object({
  info: InfoSchema,
  steps: z.array(StepSchema),
});

export type Step = z.infer<typeof StepSchema>;
export type Info = z.infer<typeof InfoSchema>;
export type Response = z.infer<typeof ResponseSchema>;
