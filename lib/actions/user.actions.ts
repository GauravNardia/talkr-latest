"use server"

import prisma from "../prisma";


interface User {
    userId: string
}

export const getUserById = async ({ userId }: User) => {
    return await prisma.user.findFirst({
      where: {
        userId: userId
      }
    });
  };
  