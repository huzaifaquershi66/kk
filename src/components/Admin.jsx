
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, getDocs, updateDoc, doc, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const AdminPanel = () => {
    const [orders, setOrders] = useState([]);
    const [vectors, setVectors] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [completedVectors, setCompletedVectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('order-records');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
          // setIsLoggedIn(true);
          // Handle not authenticated state
        }
      });
      return () => unsubscribe();
    }, []);
    // const handleLogin = (e) => {
    //   e.preventDefault();
    //   // Replace with your actual credentials
    //   if (username === 'huzaifa56567' && password === 'huzaifa123') {
    //     setIsLoggedIn(true);
    //     setError('');
    //   } else {
    //     setError('Invalid username or password');
    //   }
    // };
  
    const fetchAllOrders = async () => {
      try {
        const ordersCollection = collection(db, 'orders');
        const querySnapshot = await getDocs(ordersCollection);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Filter out completed orders
        const savedCompletedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
        const activeOrders = ordersData.filter(order => !savedCompletedOrders.some(completed => completed.id === order.id));
  
        setOrders(activeOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchAllVectors = async () => {
      try {
        const vectorsCollection = collection(db, 'vectors');
        const querySnapshot = await getDocs(vectorsCollection);
        const vectorsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Filter out completed vectors
        const savedCompletedVectors = JSON.parse(localStorage.getItem('completedVectors')) || [];
        const activeVectors = vectorsData.filter(vector => !savedCompletedVectors.some(completed => completed.id === vector.id));
  
        setVectors(activeVectors);
      } catch (error) {
        console.error("Error fetching vectors:", error);
      }
    };
 

  
    useEffect(() => {
      fetchAllOrders();
      fetchAllVectors();
  
      // Load completed orders and vectors from localStorage
      const savedCompletedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
      const savedCompletedVectors = JSON.parse(localStorage.getItem('completedVectors')) || [];
      setCompletedOrders(savedCompletedOrders);
      setCompletedVectors(savedCompletedVectors);
    }, []);
  
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const markOrderAsCompleted = (orderId) => {
      setOrders(prevOrders => {
        const updatedOrders = prevOrders.filter(order => order.id !== orderId);
        const completedOrder = prevOrders.find(order => order.id === orderId);
        if (completedOrder) {
          const updatedCompletedOrders = [...completedOrders, completedOrder];
          setCompletedOrders(updatedCompletedOrders);
          localStorage.setItem('completedOrders', JSON.stringify(updatedCompletedOrders));
        }
        return updatedOrders;
      });
    };
  
    const markVectorAsCompleted = (vectorId) => {
      setVectors(prevVectors => {
        const updatedVectors = prevVectors.filter(vector => vector.id !== vectorId);
        const completedVector = prevVectors.find(vector => vector.id === vectorId);
        if (completedVector) {
          const updatedCompletedVectors = [...completedVectors, completedVector];
          setCompletedVectors(updatedCompletedVectors);
          localStorage.setItem('completedVectors', JSON.stringify(updatedCompletedVectors));
        }
        return updatedVectors;
      });
    };

  return (
    <div className="dashboard">
      <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === 'order-records' ? 'active' : ''} onClick={() => handleTabClick('order-records')}>
            Order Records
          </li>
          <li className={activeTab === 'vector-records' ? 'active' : ''} onClick={() => handleTabClick('vector-records')}>
            Vector Records
          </li>
          <li className={activeTab === 'completed-orders' ? 'active' : ''} onClick={() => handleTabClick('completed-orders')}>
            Completed Orders
          </li>
          <li className={activeTab === 'completed-vectors' ? 'active' : ''} onClick={() => handleTabClick('completed-vectors')}>
            Completed Vectors
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <button className="hamburger" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {activeTab === 'order-records' && (
              <>
                <h3>All Orders</h3>
                <ul>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="order-card" key={order.id}>
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>Email:</strong> {order.customerEmail} <br />
                        <strong>Full Name:</strong> {order.customerName} <br />
                        <strong>Company Name:</strong> {order.companyname} <br />
                        <strong>Phone Number:</strong> {order.phone} <br />
                        <strong>Design Name:</strong> {order.designName} <br />
                        <strong>Location:</strong> {order.location} <br />
                        <strong>Price:</strong> ${order.price} <br /> {/* Use finalPrice here */}
                        <strong>Number Of Colors:</strong> {order.numberOfColors} <br />
                        <strong>Color Name:</strong> {order.colorName} <br />
                        <strong>Height:</strong> {order.height} <br />
                        <strong>Width:</strong> {order.width} <br />
                        <strong>Fabric:</strong> {order.fabric} <br />
                        <strong>Format:</strong> {order.format} <br />
                        <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
                        <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
                        <strong>Comment:</strong> {order.comments} <br />
                        <strong>Order Status:</strong> {order.status} <br /> 
                        <button  onClick={() => markOrderAsCompleted(order.id)}>Mark as Completed</button>
                      </div>
                    ))
                  ) : (
                    <p>No orders found.</p>
                  )}
                </ul>
              </>
            )}

            {activeTab === 'vector-records' && (
              <>
                <h3>All Vectors</h3>
                <ul>
                  {vectors.length > 0 ? (
                    vectors.map((order) => (
                      <div className="order-card" key={order.id}>
                        <strong>Vector ID:</strong> {order.id} <br />
                        <strong>Email:</strong> {order.customerEmail} <br />
        <strong>Full Name:</strong> {order.customerName} <br />
        <strong>Company Name:</strong> {order.companyname} <br />
        <strong>Phone Number:</strong> {order.phone} <br />
        <strong>Design Name:</strong> {order.designName} <br />
     
        <strong>Price:</strong> ${order.rush ? order.price - 5 : order.price} <br /> {/* Show original price if rush */}        <strong>Number Of Colors:</strong> {order.location} <br />
        <strong>Color Name:</strong> {order.colorName} <br />
        <strong>Height:</strong> {order.height} <br />
        <strong>Width:</strong> {order.width} <br />
        <strong>Format:</strong> {order.format} <br />
        <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
       <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
        <strong>Comment:</strong> {order.comments} <br />
                        <button onClick={() => markVectorAsCompleted(order.id)}>Mark as Completed</button>
                      </div>
                    ))
                  ) : (
                    <p>No vectors found.</p>
                  )}
                </ul>
              </>
            )}

            {activeTab === 'completed-orders' && (
              <>
                <h3>Completed Orders</h3>
                <ul>
                  {completedOrders.length > 0 ? (
                    completedOrders.map((order) => (
                        <div className="order-card" key={order.id}>
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>Email:</strong> {order.customerEmail} <br />
                        <strong>Full Name:</strong> {order.customerName} <br />
                        <strong>Company Name:</strong> {order.companyname} <br />
                        <strong>Phone Number:</strong> {order.phone} <br />
                        <strong>Design Name:</strong> {order.designName} <br />
                        <strong>Location:</strong> {order.location} <br />
                        <strong>Price:</strong> ${order.price} <br /> {/* Use finalPrice here */}
                        <strong>Number Of Colors:</strong> {order.numberOfColors} <br />
                        <strong>Color Name:</strong> {order.colorName} <br />
                        <strong>Height:</strong> {order.height} <br />
                        <strong>Width:</strong> {order.width} <br />
                        <strong>Fabric:</strong> {order.fabric} <br />
                        <strong>Format:</strong> {order.format} <br />
                        <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
                        <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
                        <strong>Comment:</strong> {order.comments} <br />
                        <strong>Order Status:</strong> completed <br /> 
                      </div>
                    ))
                  ) : (
                    <p>No completed orders found.</p>
                  )}
                </ul>
              </>
            )}

            {activeTab === 'completed-vectors' && (
              <>
                <h3>Completed Vectors</h3>
                <ul>
                  {completedVectors.length > 0 ? (
                    completedVectors.map((order) => (
                        <div className="order-card" key={order.id}>
                        <strong>Vector ID:</strong> {order.id} <br />
                        <strong>Email:</strong> {order.customerEmail} <br />
        <strong>Full Name:</strong> {order.customerName} <br />
        <strong>Company Name:</strong> {order.companyname} <br />
        <strong>Phone Number:</strong> {order.phone} <br />
        <strong>Design Name:</strong> {order.designName} <br />
     
        <strong>Price:</strong> ${order.rush ? order.price - 5 : order.price} <br /> {/* Show original price if rush */}        <strong>Number Of Colors:</strong> {order.location} <br />
        <strong>Color Name:</strong> {order.colorName} <br />
        <strong>Height:</strong> {order.height} <br />
        <strong>Width:</strong> {order.width} <br />
        <strong>Format:</strong> {order.format} <br />
        <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
       <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
        <strong>Comment:</strong> {order.comments} <br />
        <strong>Order Status:</strong> completed <br /> 
                      </div>
                    ))
                  ) : (
                    <p>No completed vectors found.</p>
                  )}
                </ul>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
