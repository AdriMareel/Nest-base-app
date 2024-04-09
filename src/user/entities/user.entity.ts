import { Post } from "src/post/entities/post.entity";

export class User {
    id : number;
    name : string;
    email : string;
    Posts : Post[];
}
