"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "The book's title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "The book's author is required"],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "The genre is required"],
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not valid genre",
        },
        trim: true,
    },
    isbn: {
        type: String,
        trim: true,
        required: [true, "The book's Isbn Number is required"],
        unique: [true, "The book's Isbn Number is already Exists"],
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "The number of copies is required"],
        min: [1, "The number of copies must be is grater than 0"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer",
        },
    },
    available: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", booksSchema);
