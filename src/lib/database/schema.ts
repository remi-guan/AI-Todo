// src/lib/database/schema.ts
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const info = sqliteTable('info', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  moneyUnit: text('moneyUnit').notNull(),
});

export const response = sqliteTable('response', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  infoId: integer('infoId').notNull().references(() => info.id, { onDelete: 'cascade' }),
});

export const step = sqliteTable('step', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  icon: text('icon').notNull(),
  details: text('details').notNull(),
  moneyCost: real('moneyCost').notNull(),
  timeCost: real('timeCost').notNull(),
  responseId: integer('responseId').notNull().references(() => response.id, { onDelete: 'cascade' }),
});

export const completion = sqliteTable('completion', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  value: integer('value').notNull(), // 0 or 1 to represent boolean
  stepId: integer('stepId').notNull().references(() => step.id, { onDelete: 'cascade' }),
});

// Infer the models for TypeScript types
export type Info = InferSelectModel<typeof info>;
export type NewInfo = InferInsertModel<typeof info>;

export type Response = InferSelectModel<typeof response>;
export type NewResponse = InferInsertModel<typeof response>;

export type Step = InferSelectModel<typeof step>;
export type NewStep = InferInsertModel<typeof step>;

export type Completion = InferSelectModel<typeof completion>;
export type NewCompletion = InferInsertModel<typeof completion>;
