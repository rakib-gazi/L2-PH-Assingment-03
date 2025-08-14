import { Model, model, Schema } from "mongoose";
import { borrowStaticMethod, IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrow, borrowStaticMethod>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "The book's id is required"],
    },
    quantity: {
      type: Number,
      required: [true, "The quantity of borrow book is required"],
      min: [
        1,
        "The quantity of borrow book at least is 01 . You requested for {VALUE}",
      ],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an positive number",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "The due date is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


borrowSchema.pre("save", async function () {
  const book = await Book.findById(this.book, { copies: 1 });
    if (!book) {
        throw new Error("Book not found")
    };
    if (book.copies < this.quantity) {
    throw new Error("Not enough copies available");
  }
 
});
borrowSchema.static(
  "validateBorrowBook",
  async function (
    this: Model<IBorrow>,
    requestedQuantity: number,
    bookId: string
  ): Promise<boolean> {
    const book = await Book.findById(bookId, { copies: 1 });
    if (!book) {
      return false;
    }
    if (book.copies >= requestedQuantity) {
      const deductCopies = book.copies - requestedQuantity;
      const updatedFields = {
        copies: deductCopies,
        available: deductCopies === 0 ? false : true,
      };
      await Book.findByIdAndUpdate(bookId, updatedFields, { new: true });
      return updatedFields.available;
    }
    return false;
  }
);

export const Borrow = model<IBorrow, borrowStaticMethod>("Borrow", borrowSchema);
