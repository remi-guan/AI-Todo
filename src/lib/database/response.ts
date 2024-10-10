import { db } from './db';
import { eq, inArray, sql } from 'drizzle-orm';
import type { Info, Response, Step, Completion } from './schema';
import { info, response, step, completion } from './schema';
import { getMarkdownListCount } from '$lib/utils';
import type { ZodResponse } from '$lib/schemas';

export type StepWithRelations = Step & { completions: Completion[] };

export interface ResponseWithRelations extends Response {
  info: Info;
  steps: StepWithRelations[];
}

export async function getResponseById(infoId: number): Promise<ResponseWithRelations | undefined> {
  // Fetch the response and associated info
  const [responseData] = await db
    .select()
    .from(response)
    .innerJoin(info, eq(response.infoId, info.id))
    .where(eq(response.infoId, infoId));

  if (!responseData) {
    return undefined;
  }

  const responseId = responseData.response.id;

  // Fetch steps for the response
  const steps = (await db.select().from(step).where(eq(step.responseId, responseId))) as Step[];

  // Fetch completions for all steps
  const stepIds = steps.map((s) => s.id);

  const completions = (await db.select().from(completion).where(inArray(completion.stepId, stepIds))) as Completion[];

  // Group completions by stepId
  const completionsByStepId = completions.reduce(
    (acc, curr) => {
      if (!acc[curr.stepId]) {
        acc[curr.stepId] = [];
      }
      acc[curr.stepId].push(curr);
      return acc;
    },
    {} as Record<number, Completion[]>
  );

  // Combine steps with their completions
  const stepsWithCompletions = steps.map((s) => ({
    ...s,
    completions: completionsByStepId[s.id] || []
  }));

  return {
    ...responseData.response,
    info: responseData.info,
    steps: stepsWithCompletions
  };
}

export async function getAllInfos(): Promise<Info[]> {
  return db.select().from(info);
}

export async function saveResponse(responseData: ZodResponse): Promise<ResponseWithRelations> {
  // Start a transaction
  return await db.transaction(async (tx) => {
    // Insert into 'info' table
    const [createdInfo] = await tx.insert(info).values(responseData.info).returning();

    // Insert into 'response' table
    const [createdResponse] = await tx.insert(response).values({ infoId: createdInfo.id }).returning();

    const stepsWithCompletions: (Step & { completions: Completion[] })[] = [];

    for (const stepData of responseData.steps) {
      const tasksCount = getMarkdownListCount(stepData.details);

      // Insert into 'step' table
      const [createdStep] = await tx
        .insert(step)
        .values({
          ...stepData,
          responseId: createdResponse.id
        })
        .returning();

      // Create Completions
      const completionsData = Array.from({ length: tasksCount }, () => ({
        value: false,
        stepId: createdStep.id
      }));

      const completions = await tx.insert(completion).values(completionsData).returning();

      stepsWithCompletions.push({
        ...createdStep,
        completions
      });
    }

    return {
      ...createdResponse,
      info: createdInfo,
      steps: stepsWithCompletions
    };
  });
}

export async function updateStepCompletions(stepId: number, completions: Completion[]): Promise<void> {
  await db.transaction(async (tx) => {
    for (const completionData of completions) {
      await tx.update(completion).set({ value: completionData.value }).where(eq(completion.id, completionData.id));
    }
  });
}

export async function deleteResponseById(infoId: number): Promise<void> {
  await db.transaction(async (tx) => {
    // Delete the response directly
    await tx
      .delete(response)
      .where(eq(response.infoId, sql`${infoId}`)) // Use `sql` wrapper for proper type handling
      .run();

    // Delete the info record, it's only associated with this response
    await tx
      .delete(info)
      .where(eq(info.id, sql`${infoId}`))
      .run();
  });
}
