export interface ITodo {
    id?: string;
    title: string;
    body?: string | null;
    completed?: boolean;
    user_Id: string;
    userId?: string;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }