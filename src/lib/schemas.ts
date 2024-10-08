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

export const ParsedResponseSchema = z.object({
  info: InfoSchema,
  steps: z.array(StepSchema)
});

export type ParsedResponse = z.infer<typeof ParsedResponseSchema>;
