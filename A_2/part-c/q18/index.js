import mongoose from "mongoose";
import { connectToDatabase } from "../../client.js";
import { Book } from "../q1/index.js";

async function Q18() {
  try {
    await connectToDatabase();

    console.log("🧪 Testing Book schema validation rules...");

    // Test 1: Valid book (should succeed)
    console.log("\n--- Test 1: Valid Book ---");
    try {
      const validBook = new Book({
        title: "Valid Book",
        author: "Test Author",
        price: 29.99,
        stock: 10,
      });
      await validBook.save();
      console.log("✅ Valid book saved successfully:", validBook.title);
    } catch (error) {
      console.log("❌ Unexpected error with valid book:", error.message);
    }

    // Test 2: Invalid price (should fail)
    console.log("\n--- Test 2: Invalid Price (<= 0) ---");
    try {
      const invalidPriceBook = new Book({
        title: "Invalid Price Book",
        author: "Test Author",
        price: 0, // Invalid: price must be > 0
        stock: 5,
      });
      await invalidPriceBook.save();
      console.log(
        "❌ Book with invalid price was saved (this shouldn't happen)"
      );
    } catch (error) {
      console.log(
        "✅ Validation correctly prevented saving book with invalid price:"
      );
      console.log("   Error:", error.message);
    }

    // Test 3: Negative stock (should fail)
    console.log("\n--- Test 3: Negative Stock ---");
    try {
      const negativeStockBook = new Book({
        title: "Negative Stock Book",
        author: "Test Author",
        price: 15.99,
        stock: -5, // Invalid: stock cannot be negative
      });
      await negativeStockBook.save();
      console.log(
        "❌ Book with negative stock was saved (this shouldn't happen)"
      );
    } catch (error) {
      console.log(
        "✅ Validation correctly prevented saving book with negative stock:"
      );
      console.log("   Error:", error.message);
    }

    // Test 4: Missing required fields (should fail)
    console.log("\n--- Test 4: Missing Required Fields ---");
    try {
      const incompleteBook = new Book({
        title: "Incomplete Book",
        // Missing author, price, stock
      });
      await incompleteBook.save();
      console.log("❌ Incomplete book was saved (this shouldn't happen)");
    } catch (error) {
      console.log("✅ Validation correctly prevented saving incomplete book:");
      console.log("   Error:", error.message);
    }

    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error testing validation rules:", error);
    process.exit(1);
  }
}

Q18();
