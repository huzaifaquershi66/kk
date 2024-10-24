import React from "react";
import { useSelector } from "react-redux";

const OrderDashboard = () => {
  // Access order data from the Redux store
  const { formData } = useSelector((state) => state.order);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen p-10 font-sans">
      <div className="w-full max-w-4xl bg-white p-10 shadow-lg rounded-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Order Dashboard
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Design Name:</h3>
            <p>{formData.designName || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Customer Name:</h3>
            <p>{formData.customerName || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Customer Email:</h3>
            <p>{formData.customerEmail || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Phone Number:</h3>
            <p>{formData.phone || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Format:</h3>
            <p>{formData.format}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Location:</h3>
            <p>{formData.location || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Size:</h3>
            <p>{formData.height} x {formData.width} inches</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Color Options:</h3>
            <p>{formData.colorOptions || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Expected Delivery:</h3>
            <p>{formData.expectedDelivery || "Not provided"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Comments:</h3>
            <p>{formData.comments || "No comments provided"}</p>
          </div>
          {formData.file && (
            <div>
              <h3 className="font-semibold text-gray-800">Uploaded File:</h3>
              <p>{formData.file.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
