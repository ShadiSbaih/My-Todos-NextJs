"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pen} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { todoFormSchema, TodoFormValues } from "@/../schema";
import {updateTodoAction } from "../../actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import Spinner from "./Spinner";
import { ITodo } from "../interfaces";

export default function EditTodoForm({todo}: {todo: ITodo}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const defaultValues: TodoFormValues = {
        title: todo.title,
        body: todo.body || "",
        completed: todo.completed || false,
        userId: todo.user_Id
    };

    const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const onSubmit = async (data: TodoFormValues) => {
        setLoading(true);
        try {
            await updateTodoAction({
                id: todo.id as string,
                title: data.title,
                body: data.body,
                completed: !!data.completed,
                user_Id: todo.user_Id
            });
            setLoading(false);
            setOpen(false);
        } catch (error) {
            console.error("Failed to update todo:", error);
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"outline"}>
                    <Pen size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                    <DialogDescription>
                        Edit a Todo to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="go to gym" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display title.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Body</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about Task"
                                                className="resize-none"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            You can <span>@mention</span> other users and
                                            organizations to link to them.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="completed"
                                render={({ field }) => (
                                    <FormItem className="flex  items-start flex-col space-y-2">
                                        <div className="flex space-x-3">    <FormLabel>Completed</FormLabel>
                                            <FormControl>
                                                <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
                                            </FormControl></div>
                                        <FormDescription>
                                            Mark this task as completed.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="space-x-2">
                                <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? <Spinner className="mr-2" /> : null}
                                    Save changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
