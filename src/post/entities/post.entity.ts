import { User } from "@prisma/client";

export class Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    author : User;
    authorId: number;
}
