import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function LiveOrderTracking() {
  const { id } = useParams(); // orderId from URL
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);

  const steps = ["Pending", "Preparing", "On the way", "Delivered"];

  // Fetch order status from backend
  const fetchStatus = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`); // backend API
      const data = await res.json();
      setStatus(data.status);
    } catch (err) {
      console.error("Error fetching order:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus(); // first fetch

    // Polling every 5 seconds
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <p className="p-5">Loading order status...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">Live Order Tracking</h2>

      <div className="flex space-x-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${steps.indexOf(status) >= index ? "bg-green-500 text-white" : "bg-gray-300"}
              `}
            >
              {index + 1}
            </div>
            {/* Step Label */}
            <p className="mt-2">{step}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-lg">
        Current Status: <span className="font-semibold">{status}</span>
      </p>
    </div>
  );
}

export default LiveOrderTracking;
