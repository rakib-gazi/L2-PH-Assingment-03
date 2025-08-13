"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    copies: { type: Number, required: true, trim: true },
    available: { type: Boolean, required: true },
}, {
    versionKey: false,
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)('Book', booksSchema);
