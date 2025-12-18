"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ITodo } from "../interfaces";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  try {
    return await prisma.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching todo list:", error);
    throw error;
  }
};


export const createTodoAction = async ({
  title,
  body,
  completed,
}: {
  title: string;
  body: string | undefined;
  completed: boolean | undefined;
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const slug = title.toLowerCase().replace(/ /g, "-");

  await prisma.todo.create({
    data: {
      title: title,
      body: body,
      slug: slug,
      completed: completed,
      userId: userId,
    },
  });
  revalidatePath("/");

};

export const updateTodoAction = async ({ id, title, body, completed }: ITodo) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.todo.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
};

export const deleteTodoAction = async ({ id }: { id: string }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await prisma.todo.deleteMany({
    where: {
      id,
      userId,
    },
  });
  revalidatePath("/");
};
