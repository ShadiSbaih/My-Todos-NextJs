// "use client";

import AddTodoForm from "@/components/AddTodoForm";
import { TodoTable } from "@/components/TodoTable";
import { getUserTodoListAction } from "../../actions/todo.actions";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

// Create a loading component
function TodosLoading() {
  return (
    <div className="flex justify-center items-center h-40">
      <Spinner />
    </div>
  );
}

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="container mx-auto p-4">
      {/* <pre>{JSON.stringify(todos, undefined, 2)}</pre> */}
      {/* { todos.map((todo) => (
        <li key={todo.id} className="list-decimal">
          {todo.title}
        </li>
      )) 
      } */}
      <AddTodoForm userId={userId} />
      <Suspense fallback={<TodosLoading />}>
        <TodosContent userId={userId} />
      </Suspense>
    </main>
  );
}

// Create a component that fetches the data
async function TodosContent({ userId }: { userId: string | null }) {
  try {
    const todos = await getUserTodoListAction({ userId });
    
    if (todos.length === 0) {
      return (
        <div className="text-center my-10 py-8">
          <h2 className="text-xl font-medium mb-2">No todos yet</h2>
          <p className="text-muted-foreground">Create your first todo to get started!</p>
        </div>
      );
    }
    
    return <TodoTable todos={todos} />;
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}