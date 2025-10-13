import { connectToDatabase } from "../../client.js";
import mongoose from "mongoose";

async function main() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    const books = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 15.99,
        stock: 50,
        genre: "Fiction",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 12.99,
        stock: 40,
        genre: "Fiction",
      },
      {
        title: "1984",
        author: "George Orwell",
        price: 14.99,
        stock: 60,
        genre: "Dystopian",
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 11.99,
        stock: 30,
        genre: "Romance",
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 13.99,
        stock: 45,
        genre: "Fiction",
      },
    ];

    const result = await db.collection("books").insertMany(books);
    console.log(
      `✅ Inserted ${result.insertedCount} books into the 'books' collection`
    );
    console.log("Inserted IDs:", result.insertedIds);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

main();
