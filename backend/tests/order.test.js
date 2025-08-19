
// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../server"); 




// describe("Order API Tests", () => {
//   let userId = "testuser123";
//   let createdOrderId;

//   test("Place an order", async () => {
//     const res = await request(app)
//       .post("/api/orders/place")
//       .send({
//         userId,
//         items: [
//           { productId: "prod001", name: "Pizza", price: 299, quantity: 1 },
//         ],
//         totalAmount: 299,
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("message", "Order placed successfully");
//     createdOrderId = res.body.order._id;
//   });

//   test("Get orders for a user", async () => {
//     const res = await request(app).get(`/api/orders/${userId}`);
//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   test("Cancel an order", async () => {
//     const res = await request(app)
//       .post("/api/orders/cancel")
//       .send({ orderId: createdOrderId });
//     expect(res.statusCode).toBe(200);
//     expect(res.body.order.status).toBe("Cancelled");
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });
