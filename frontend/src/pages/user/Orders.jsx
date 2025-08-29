import { useState } from "react";

function Orders() {
 
  const [status, setStatus] = useState("Preparing");

  const steps = ["Pending", "Preparing", "On the way", "Delivered"];

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-6">Order Tracking</h2>

      <div className="flex space-x-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${steps.indexOf(status) >= index ? "bg-green-500 text-white" : "bg-gray-300"}
              `}
            >
              {index + 1}
            </div>
            {/* Label */}
            <p className="mt-2">{step}</p>
          </div>
        ))}
      </div>

      {/* Demo button: status change */}
      <div className="mt-6 flex gap-2">
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Orders;

