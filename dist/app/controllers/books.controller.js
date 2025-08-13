"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post("/", async (req, res) => {
    try {
        const body = req.body;
        const book = await books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.booksRoutes.get("/", async (req, res) => {
    const books = await books_model_1.Book.find();
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
});
exports.booksRoutes.get("/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const book = await books_model_1.Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
});
exports.booksRoutes.put("/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await books_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
});
exports.booksRoutes.delete("/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const book = await books_model_1.Book.findByIdAndDelete(bookId);
    res.status(200).json({
        success: true,
        message: "Book deleted  successfully",
        data: book ? null : book,
    });
});
