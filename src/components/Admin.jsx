import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function AdminPanel() {
  const allUsers = useSelector((state) => state.auth.user); // Access all users here
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    // Log all users and orders to check their contents
    console.log("All Users from Redux:", allUsers);
    console.log("Orders from Redux:", orders);
  }, [allUsers, orders]);

  const userOrders = allUsers.map(user => {
    const userOrderList = orders.filter(order => order.userId === user.id);
    return { ...user, orders: userOrderList };
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center shadow-lg">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </header>

      <main className="flex-1 bg-white shadow-md rounded-lg p-4 ml-4">
        <h2 className="text-xl font-semibold mb-4">All Users and Their Orders</h2>
        <ul>
          {userOrders.length > 0 ? (
            userOrders.map(user => (
              <li key={user.id} className="border-b py-2">
                <h3 className="font-semibold">{user.fullName}</h3>
                <p>Email: {user.email}</p>
                <p>Company: {user.company}</p>
                <h4 className="font-semibold">Orders:</h4>
                <ul>
                  {user.orders.length > 0 ? (
                    user.orders.map(order => (
                      <li key={order.id} className="ml-4">
                        <p><strong>Order Id:</strong> {order.id}</p>
                        <p><strong>Design Name:</strong> {order.designName}</p>
                        <p><strong>Price:</strong> ${order.price}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                      </li>
                    ))
                  ) : (
                    <p>No orders found for this user.</p>
                  )}
                </ul>
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      </main>
    </div>
  );
}

export default AdminPanel;
