import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { orderId, amount } = state || {};

  useEffect(() => {
    if (!orderId || !amount) {
      // Agar state missing ho, to orders page pe redirect
      navigate("/orders", { replace: true });
    }
  }, [orderId, amount, navigate]);

  if (!orderId || !amount) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl px-6 py-8 max-w-md w-full text-center">
        <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-4" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="text-left text-sm bg-gray-100 rounded-md p-4 mb-4">
          <p>
            <span className="font-medium">Order ID:</span> {orderId}
          </p>
          <p>
            <span className="font-medium">Total Paid:</span> ₹{amount.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Status:</span> Pending
          </p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="inline-block mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
