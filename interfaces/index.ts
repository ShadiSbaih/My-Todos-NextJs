export interface ITodo {
    id?: string;
    title: string;
    slug?: string | null;
    body: string | null;
    completed: boolean;
    createdAt?: Date;
    userId: string;
}