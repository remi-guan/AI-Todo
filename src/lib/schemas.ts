import { z } from 'zod';

export const CompletionSchema = z.object({
  id: z.number(),
  value: z.boolean()
});

export const StepSchema = z.object({
  title: z.string(),
  icon: z.string(),
  details: z.string(),
  moneyCost: z.number(),
  timeCost: z.number(),
  completions: CompletionSchema.array().default([])
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

export type ZodInfo = z.infer<typeof InfoSchema>;
export type ZodResponse = z.infer<typeof ResponseSchema>;