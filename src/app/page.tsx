// "use client";

import AddTodoForm from "@/components/AddTodoForm";
import { TodoTable } from "@/components/TodoTable";
import { getTodoListAction } from "../../actions/todo.actions";

export default  async function Home() {
   const todos = await getTodoListAction();
 
  return (
    <main className="container mx-auto p-4">
      {/* <pre>{JSON.stringify(todos, undefined, 2)}</pre> */}
      {/* { todos.map((todo) => (
        <li key={todo.id} className="list-decimal">
          {todo.title}
        </li>
      )) 
      } */}
      <AddTodoForm />
      <TodoTable todos={todos}/>
    </main>
  );
}