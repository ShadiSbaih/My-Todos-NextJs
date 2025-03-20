"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ITodo } from "../src/interfaces";
import { TodoError, ValidationError, logError } from "../src/lib/error-utils";

// Global prisma instance setup
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to prevent multiple instances
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export const getUserTodoListAction = async ({userId}:{userId:string|null}) => {
  try {
    if (!userId) {
      return [];
    }
    
    return await prisma.todo.findMany({
      where: {
        user_Id: userId
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    logError(error, "getUserTodoListAction");
    throw new TodoError("Failed to fetch todo list");
  }
};


export const createTodoAction = async ({
  title,
  body,
  completed = false,
  userId,
}: {
  title: string;
  body: string | undefined;
  completed?: boolean;
  userId: string;
}) => {
  try {
    if (!userId) {
      throw new ValidationError("User ID is required");
    }
    
    if (!title || title.trim().length < 3) {
      throw new ValidationError("Title must be at least 3 characters");
    }

    const slug = title.toLowerCase().replace(/ /g, "-");

    await prisma.todo.create({
      data: {
        title,
        body: body || null,
        slug,
        completed,
        user_Id: userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    logError(error, "createTodoAction");
    
    // Re-throw custom errors, but wrap Prisma/other errors
    if (error instanceof ValidationError) {
      throw error;
    }
    
    throw new TodoError("Failed to create todo");
  }
};

export const updateTodoAction = async ({ id, title, body, completed }: ITodo) => {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        body: body || null,
        completed,
        slug : title.toLowerCase().replace(/ /g, "-")
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id
    },
  });
  revalidatePath("/");
};
