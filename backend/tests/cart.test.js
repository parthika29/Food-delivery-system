// const request = require("supertest");
// const app = require("../server");
// const mongoose = require("mongoose");

// let userId = "testuser123";
// let productId;

// // beforeAll(async () => {
// //   if (mongoose.connection.readyState === 0) {
// //     await mongoose.connect(process.env.MONGO_URI);
// //   }
// // });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("Cart API Tests", () => {
//   test("Add item to cart", async () => {
//     const res = await request(app)
//       .post("/api/cart/add")
//       .send({
//         userId,
//         productId: "prod123",
//         name: "Sample Product",
//         price: 100,
//         quantity: 1
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("message", "Item added to cart");
//     expect(res.body.cart.items.length).toBeGreaterThan(0);

//     // Store productId for next tests
//     productId = res.body.cart.items[0].productId;
//   });

//   test("Update item quantity", async () => {
//     const res = await request(app)
//       .post("/api/cart/update")
//       .send({ userId, productId, action: "increase" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("message", "Cart updated");
//   });

//   test("Remove item from cart", async () => {
//     const res = await request(app)
//       .post("/api/cart/remove")
//       .send({ userId, productId });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("message", "Item removed");
//   });
// });
