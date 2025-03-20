"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ITodo } from "../interfaces";

const prisma = new PrismaClient();

export const getTodoListAction = async () => {
  try {
    return await prisma.todo.findMany({
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
  const slug = title.toLowerCase().replace(/ /g, "-");

  await prisma.todo.create({
    data: {
      title: title,
      body: body,
      slug: slug,
      completed: completed,
     user_id: "1",
    },
  });
  revalidatePath("/");

};

export const updateTodoAction = async ({ id, title, body, completed }: ITodo) => {
  await prisma.todo.update({
    where: {
      id,
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
  await prisma.todo.delete({
    where: {
      id
    },
  });
  revalidatePath("/");
};
