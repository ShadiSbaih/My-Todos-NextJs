import AddTodoForm from "@/components/AddTodoForm";
import { TodoTable } from "@/components/TodoTable";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { getTodoListAction } from "../../actions/todo.actions";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="min-h-[calc(100vh-64px)] px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center pt-24 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Todo App</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Manage your tasks efficiently with our simple todo application. Sign
            in to create and manage your own todos.
          </p>

          <div className="mt-20">
            <h2 className="text-xl font-semibold">Welcome to Todo App</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to start managing your todos
            </p>

            <div className="mt-6 flex justify-center">
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const todos = await getTodoListAction();

  return (
    <main className="container mx-auto p-4">
      <AddTodoForm />
      <TodoTable todos={todos} />
    </main>
  );
}