"use client";
import {  Trash } from "lucide-react";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { deleteTodoAction } from "../../actions/todo.actions";
import { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import { ITodo } from "../../interfaces";

export default function TodoTableButtons({ todo }: { todo: ITodo }) {
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex justify-end space-x-2">
            <EditTodoForm  todo={todo}/>
            <Button
                size={"icon"}
                variant={"destructive"}
                onClick={async () => {
                    setLoading(true);
                    await deleteTodoAction({ id:todo.id as string});
                    setLoading(false);
                }}
            >
                {loading ? <Spinner /> : <Trash size={16} />}
            </Button>
        </div>
    );
}
