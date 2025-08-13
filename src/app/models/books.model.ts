import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const booksSchema =  new Schema<IBook>({
    title: {type : String, required : true, trim : true},
    author: {type : String, required : true, trim : true},
    genre:{type : String, required : true, trim : true},
    isbn:{type : String, required : true, trim : true},
    description:{type : String, required : true, trim : true},
    copies:{type : Number, required : true, trim : true},
    available:{type : Boolean, required : true},
},{
    versionKey:false,
    timestamps:true,
});

export const Book = model<IBook>('Book', booksSchema);