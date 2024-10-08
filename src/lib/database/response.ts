import type { Response } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { ParsedResponse } from '$lib/schemas';

const prisma = new PrismaClient();

export async function getResponseById(infoId: number): Promise<Response> {
  return prisma.response.findUnique({
    where: {
      infoId: infoId
    },
    include: {
      info: true, // Include the associated Info
      steps: {
        include: {
          completions: true // Include the completions for each step
        }
      }
    }
  });
}

/**
 * Get all infos from the database.
 * @returns {Promise<Info[]>} List of all Info objects.
 */
export async function getAllInfos() {
  return prisma.info.findMany();
}

/**
 * Saves a response to the database by creating an Info, Response, Steps, and Completions.
 * @param {ParsedResponse} response - The response object to be saved. It includes info, steps, and completions.
 */
export async function saveResponse(response: ParsedResponse): Promise<Response> {
  // Create Info
  const createdInfo = await prisma.info.create({
    data: {
      title: response.info.title,
      icon: response.info.icon,
      category: response.info.category,
      moneyUnit: response.info.moneyUnit
    }
  });

  // Create Response
  const createdResponse = await prisma.response.create({
    data: {
      infoId: createdInfo.id
    },
    include: {
      info: true,
      steps: {
        include: {
          completions: true
        }
      }
    }
  });

  // Create Steps and Completions
  const stepsWithCompletions = await Promise.all(
    response.steps.map(async (step) => {
      const createdStep = await prisma.step.create({
        data: {
          title: step.title,
          icon: step.icon,
          details: step.details,
          moneyCost: step.moneyCost,
          timeCost: step.timeCost,
          responseId: createdResponse.id
        },
        include: {
          completions: true
        }
      });

      const completions = await Promise.all(
        step.completions.map(async (completion) => {
          return prisma.completion.create({
            data: {
              value: completion,
              stepId: createdStep.id
            }
          });
        })
      );

      return {
        ...createdStep,
        completions
      };
    })
  );

  return {
    ...createdResponse,
    info: createdInfo,
    steps: stepsWithCompletions
  };
}

/**
 * Updates the completion status of a step's subtasks.
 * @param {number} stepId - The ID of the step to update completions for.
 * @param {boolean[]} completions - An array of booleans representing the completion status of the subtasks.
 * @returns {Promise<void>} - A promise that resolves when the completions have been updated.
 */
export async function updateStepCompletions(stepId: number, completions: boolean[]): Promise<void> {
  try {
    // First, find all existing completion records for the step
    const existingCompletions = await prisma.completion.findMany({
      where: { stepId }
    });

    // Update each completion record, matching by index
    await Promise.all(
      completions.map((completionValue, index) => {
        if (existingCompletions[index]) {
          // If the completion exists, update its value
          return prisma.completion.update({
            where: { id: existingCompletions[index].id },
            data: { value: completionValue }
          });
        } else {
          // If the completion doesn't exist, create a new one
          return prisma.completion.create({
            data: {
              value: completionValue,
              stepId: stepId
            }
          });
        }
      })
    );
  } catch (error) {
    console.error('Error updating completions:', error);
    throw new Error('Failed to update completions.');
  }
}