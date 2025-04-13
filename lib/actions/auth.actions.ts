"use server";

import { z } from "zod";
import { onboardingSchema } from "../validations/auth";
import prisma from "../prisma";

export async function OnboardUser(
  values: z.infer<typeof onboardingSchema>,
  userId: string,
) {
  try {
    const parsedValues = onboardingSchema.parse(values);

    const existingUser = await prisma.user.findFirst({
      where: { email: parsedValues.email },
    });

    if (existingUser) {
      return await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          username: parsedValues.username,
          native: parsedValues.native,
          target: parsedValues.target,
        },
      });
    }

    return await prisma.user.create({
      data: {
        userId,
        email: parsedValues.email,
        username: parsedValues.username,
        native: parsedValues.native,
        target: parsedValues.target,
        onboarded: true,
      },
    });
  } catch (error) {
    console.error("Error in OnboardUser:", error);
    throw new Error("Failed to onboard user.");
  }
}
