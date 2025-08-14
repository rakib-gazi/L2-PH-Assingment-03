import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    // custom static method
    const validateBorrow = await Borrow.validateBorrowBook(
      body.quantity,
      body.book
    );
    if (!validateBorrow) {
      return res.status(400).json({
        message: "Not enough copies available or book not found",
        success: false,
      });
    }
    const borrowedBook = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: { _id: "$book", totalQuantity: { $sum: "quantity" } },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookInfo",
      },
    },
    { $unwind: "$bookInfo" },
    {
      $project: {
        _id: 0,
        book: { title: "$bookInfo.title", isbn: "$bookInfo.isbn" },
        totalQuantity: 1,
      },
    },
  ]);
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: summary,
  });
  try {
    const summary = await Borrow.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "quantity" } },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: { title: "$bookInfo.title", isbn: "$bookInfo.isbn" },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
