import mongoose from "mongoose";
import { connectToDatabase } from "../../client.js";
import { Order } from "../q3/index.js";
import { Book } from "../q1/index.js";
import { Customer } from "../q2/index.js";

async function Q20() {
  try {
    await connectToDatabase();

    console.log("🧪 Testing Order schema virtual fields...");

    // Create test data
    console.log("\n--- Creating Test Data ---");

    // Create a book
    const testBook = new Book({
      title: "Test Book for Virtual",
      author: "Virtual Author",
      price: 25.5,
      stock: 20,
    });
    await testBook.save();
    console.log(
      "✅ Test book created:",
      testBook.title,
      "- Price:",
      testBook.price
    );

    // Create a customer
    const testCustomer = new Customer({
      name: "Virtual Customer",
      email: "virtual@example.com",
      address: "Virtual Address",
    });
    await testCustomer.save();
    console.log("✅ Test customer created:", testCustomer.name);

    // Create orders with different quantities
    console.log("\n--- Creating Test Orders ---");

    const orders = [{ quantity: 1 }, { quantity: 3 }, { quantity: 5 }];

    for (let i = 0; i < orders.length; i++) {
      const order = new Order({
        customer: testCustomer._id,
        book: testBook._id,
        quantity: orders[i].quantity,
      });
      await order.save();
      console.log(`✅ Order ${i + 1} created with quantity: ${order.quantity}`);
    }

    // Test the virtual field
    console.log("\n--- Testing 'total' Virtual Field ---");

    const allOrders = await Order.find().populate("book").exec();

    allOrders.forEach((order, index) => {
      const calculatedTotal = order.total; // Access virtual field
      const expectedTotal =
        order.quantity * (order.book ? order.book.price : 0);

      console.log(`\n--- Order ${index + 1} ---`);
      console.log(`Quantity: ${order.quantity}`);
      console.log(`Book Price: $${order.book ? order.book.price : "N/A"}`);
      console.log(`Calculated Total (virtual): $${calculatedTotal}`);
      console.log(`Expected Total: $${expectedTotal}`);

      if (calculatedTotal === expectedTotal) {
        console.log("✅ Virtual field calculation is correct");
      } else {
        console.log("❌ Virtual field calculation mismatch");
      }
    });

    // Demonstrate that virtual fields are not stored in database
    console.log("\n--- Virtual Fields are Not Stored in Database ---");
    const rawOrder = await mongoose.connection.db
      .collection("orders")
      .findOne({ _id: allOrders[0]._id });
    console.log("Raw order from database:", JSON.stringify(rawOrder, null, 2));
    console.log(
      "Notice: 'total' field is not present in the raw database document"
    );

    await mongoose.disconnect();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error testing virtual fields:", error);
    process.exit(1);
  }
}

Q20();
