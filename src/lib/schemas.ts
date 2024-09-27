import { z } from 'zod';

export const StepSchema = z.object({
  title: z.string(),
  icon: z.string(),
  details: z.string(),
  moneyCost: z.number(),
  timeCost: z.number(),
  completions: z.boolean().array().default([])
});

export const InfoSchema = z.object({
  title: z.string(),
  icon: z.string(),
  category: z.string(),
  moneyUnit: z.string()
});

export const ResponseSchema = z.object({
  info: InfoSchema,
  steps: z.array(StepSchema)
});

export type Step = z.infer<typeof StepSchema>;
export type Info = z.infer<typeof InfoSchema>;
export type Response = z.infer<typeof ResponseSchema>;
