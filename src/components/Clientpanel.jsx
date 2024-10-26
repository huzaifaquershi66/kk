import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faClipboardList, faVectorSquare, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import QuickOrderForm from './nextcomp/quickform';
import Quickvectorform from './nextcomp/quickorderform';
import { updateOrderRushStatus } from './store/orderSlice';
import { updatevectorRushStatus } from './store/vectorSlice';

function Client() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const vectors = useSelector((state) => state.vector.vectors);
  const userDetails = useSelector((state) => state.auth.user);
  const [activeView, setActiveView] = useState('quickOrder');

  const handleRushToggle = (orderId) => {
    dispatch(updateOrderRushStatus(orderId));
  };

  const handleRushTogglevector = (vectorId) => {
    dispatch(updatevectorRushStatus(vectorId));
  };

  const renderAllOrders = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Records</h2>
      <ul>
        {orders.length > 0 ? (
          orders.map(order => (
            <li key={order.id} className="border-b py-2">
              <p><strong>Order Id:</strong> {order.id}</p>
              <p><strong>Customer Name:</strong> {userDetails.fullName}</p>
              <p><strong>Company Name:</strong> {userDetails.company}</p>
              <p><strong>Phone:</strong> {userDetails.phone}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Design Name:</strong> {order.designName}</p>
              <p><strong>Price:</strong> ${order.price + (order.isRush ? 5 : 0)}</p>
              <p><strong>Order Status:</strong> {order.status || 'Pending'}</p>
              <p><strong>Height:</strong> {order.height} units</p>
              <p><strong>Width:</strong> {order.width} units</p>
              <p><strong>Artwork:</strong>
                {order.fileUrl ? (
                  <img 
                    src={order.fileUrl} 
                    alt="Uploaded Artwork" 
                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                    onError={(e) => {
                      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiotX3iOA2NNNQFLlN2C-cunD_LtBuVXtBww&s';
                    }} 
                  />
                ) : 'No Artwork Uploaded'}
              </p>
              <p><strong>Format:</strong> {order.format}</p>
              <p><strong>Comments:</strong> {order.comments}</p>
              <p><strong>Location:</strong> {order.location}</p>
              <p><strong>Fabric:</strong> {order.fabric}</p>
              <p><strong>Color Name:</strong> {order.colorName}</p>
              <p><strong>No of Colors:</strong> {order.numberOfColors}</p>
              <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
              <label>
                <input
                  type="checkbox"
                  checked={order.isRush}
                  onChange={() => handleRushToggle(order.id)}
                />
                Rush Order (+$5)
              </label>
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </div>
  );

  const renderAllVectorRecords = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vector Order Records</h2>
      <ul>
        {vectors.length > 0 ? (
          vectors.map(vector => (
            <li key={vector.id} className="border-b py-2">
              <p><strong>Vector Id:</strong> {vector.id}</p>
              <p><strong>Customer Name:</strong> {userDetails.fullName}</p>
              <p><strong>Company Name:</strong> {userDetails.company}</p>
              <p><strong>Phone:</strong> {userDetails.phone}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Vector Design:</strong> {vector.designName}</p>
              <p><strong>Price:</strong> ${vector.price + (vector.isRush ? 5 : 0)}</p>
              <p><strong>Height:</strong> {vector.height} units</p>
              <p><strong>Width:</strong> {vector.width} units</p>
              <p><strong>Artwork:</strong>
                {vector.fileUrl ? (
                  <img 
                    src={vector.fileUrl} 
                    alt="Uploaded Artwork" 
                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                    onError={(e) => {
                      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiotX3iOA2NNNQFLlN2C-cunD_LtBuVXtBww&s';
                    }} 
                  />
                ) : 'No Artwork Uploaded'}
              </p>
              <p><strong>Expected Delivery:</strong> {vector.expectedDelivery}</p>
              <p><strong>Comments:</strong> {vector.comments}</p>
              <p><strong>Location:</strong> {vector.location}</p>
              <p><strong>Color Name:</strong> {vector.colorName}</p>
              <label>
                <input
                  type="checkbox"
                  checked={vector.isRush}
                  onChange={() => handleRushTogglevector(vector.id)}
                />
                Rush Order (+$5)
              </label>
            </li>
          ))
        ) : (
          <p>No vector orders found.</p>
        )}
      </ul>
    </div>
  );

  const renderInvoice = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invoice</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="border-b py-2">
              <p><strong>Invoice for:</strong> {userDetails.fullName}</p>
              <p><strong>Design Name:</strong> {order.designName}</p>
              <p><strong>Price:</strong> ${order.price + (order.isRush ? 5 : 0)}</p>
              <p><strong>Quantity:</strong> 1</p>
              <p><strong>Total:</strong> ${order.price + (order.isRush ? 5 : 0)}</p>
              <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
            </li>
          )) }
        </ul>
      ) : (
        <p>No orders available for invoicing.</p>
      )}
    </div>
  );

  const renderVectorInvoice = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vector Invoices</h2>
      {vectors.length > 0 ? (
        <ul>
          {vectors.map(vector => (
            <li key={vector.id} className="border-b py-2">
              <p><strong>Invoice for:</strong> {userDetails.fullName}</p>
              <p><strong>Vector Design:</strong> {vector.designName}</p>
              <p><strong>Price:</strong> ${vector.price + (vector.isRush ? 5 : 0)}</p>
              <p><strong>Quantity:</strong> 1</p>
              <p><strong>Total:</strong> ${vector.price + (vector.isRush ? 5 : 0)}</p>
              <p><strong>Expected Delivery:</strong> {vector.expectedDelivery}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vector orders available for invoicing.</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center shadow-lg">
        <h1 className="text-2xl font-bold">Client Panel</h1>
      </header>

      <div className="flex flex-1 p-4">
        <nav className="w-64 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li>
              <a 
                href="#" 
                className={`flex items-center p-2 rounded transition ${activeView === 'quickOrder' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-100'}`}
                onClick={() => setActiveView('quickOrder')}
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Quick Order
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`flex items-center p-2 rounded transition ${activeView === 'allOrders' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-100'}`}
                onClick={() => setActiveView('allOrders')}
              >
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> All Orders
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`flex items-center p-2 rounded transition ${activeView === 'quickVectorOrder' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-100'}`}
                onClick={() => setActiveView('quickVectorOrder')}
              >
                <FontAwesomeIcon icon={faVectorSquare} className="mr-2" /> Quick Vector Order
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`flex items-center p-2 rounded transition ${activeView === 'vectorRecords' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-100'}`}
                onClick={() => setActiveView('vectorRecords')}
              >
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> All Vector Orders
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`flex items-center p-2 rounded transition ${activeView === 'invoice' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-100'}`}
                onClick={() => setActiveView('invoice')}
              >
                <FontAwesomeIcon icon={faFileInvoice} className="mr-2" /> Invoice
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={`flex items-center p-2 rounded transition ${activeView === 'vectorInvoice' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-100'}`}
                onClick={() => setActiveView('vectorInvoice')}
              >
                <FontAwesomeIcon icon={faFileInvoice} className="mr-2" /> Vector Invoice
              </a>
            </li>
          </ul>
        </nav>

        <main className="flex-1 bg-white shadow-md rounded-lg p-4 ml-4">
          {activeView === 'quickOrder' && <QuickOrderForm />}
          {activeView === 'allOrders' && renderAllOrders()}
          {activeView === 'quickVectorOrder' && <Quickvectorform />}
          {activeView === 'vectorRecords' && renderAllVectorRecords()}
          {activeView === 'invoice' && renderInvoice()}
          {activeView === 'vectorInvoice' && renderVectorInvoice()}
        </main>
      </div>
    </div>
  );
}

export default Client;
