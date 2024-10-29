// Invoice.js
import React from 'react';

const Invoice = ({ order, userDetails }) => {
  const { id, designName, location, price, numberOfColors, colorName, height, width, fabric, expectedDelivery, fileUrl, comments, status, createdAt } = order;
  const orderDate = createdAt.toDate().toLocaleDateString();

  return (
    <div className="invoice">
      <h2>Invoice</h2>
      <p><strong>Invoice Number:</strong> {id}</p>
      <p><strong>Order Date:</strong> {orderDate}</p>
      <hr />
      <h3>Customer Information</h3>
      <p><strong>Full Name:</strong> {userDetails.fullName}</p>
      <p><strong>Company Name:</strong> {userDetails.company}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Phone Number:</strong> {userDetails.phone}</p>
      <hr />
      <h3>Order Details</h3>
      <p><strong>Design Name:</strong> {designName}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Number Of Colors:</strong> {numberOfColors}</p>
      <p><strong>Color Name:</strong> {colorName}</p>
      <p><strong>Height:</strong> {height}</p>
      <p><strong>Width:</strong> {width}</p>
      <p><strong>Fabric:</strong> {fabric}</p>
      <p><strong>Expected Delivery:</strong> {expectedDelivery}</p>
      <p><strong>Artwork:</strong> <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
      <p><strong>Comments:</strong> {comments}</p>
      <p><strong>Status:</strong> {status}</p>
      <hr />
      <h3>Thank you for your order!</h3>
    </div>
  );
};

export default Invoice;
