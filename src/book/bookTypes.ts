import type { Date } from "mongoose";
import type { User } from "../user/userTypes.js";

export interface Book{
    _id: string;
    title:string;
    author: User;
    genre: string;
    coverImage: string;
    file: string;
    createdAt: Date;
    updatedAt: Date;
}
//field author is connected to user-- coverImage~ URL