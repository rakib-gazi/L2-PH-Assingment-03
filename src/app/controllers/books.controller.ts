import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
export const booksRoutes = express.Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const book = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

booksRoutes.get("/", async (req: Request, res: Response) => {
  const books = await Book.find();
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;
  const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findByIdAndDelete(bookId);
  res.status(200).json({
    success: true,
    message: "Book deleted  successfully",
    data: book ? null : book,
  });
});
