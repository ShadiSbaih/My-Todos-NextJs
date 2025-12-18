import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ITodo } from "../../interfaces";
import { Badge } from "./ui/badge";
import TodoTableButtons from "./TodoTableButtons";


export function TodoTable({ todos }: { todos: ITodo[] }) {

    return (
        <Table>
            <TableCaption>A list of your recent todos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {todos.map((todo) => (
                    <TableRow key={todo.id}>
                        <TableCell className="font-medium">{todo.id}</TableCell>
                        <TableCell>{todo.title}</TableCell>
                        <TableCell>{todo.completed ? <Badge variant="completed">Complete</Badge> : <Badge variant="secondary">Uncompleted</Badge>}</TableCell>
                        <TableCell >
                            <TodoTableButtons todo={todo} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className=" text-end border-blue-600 border-2 ">{todos.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
