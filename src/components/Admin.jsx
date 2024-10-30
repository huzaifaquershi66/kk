
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, getDocs,getDoc, updateDoc, doc, where } from 'firebase/firestore';
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
    const [isAdmin, setIsAdmin] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [userDetailsMap, setUserDetailsMap] = useState({});
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          await fetchAllOrders();
          await fetchAllVectors();
          await fetchUserDetails()
     
          // Load completed orders and vectors from localStorage
          const savedCompletedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
          const savedCompletedVectors = JSON.parse(localStorage.getItem('completedVectors')) || [];
          setCompletedOrders(savedCompletedOrders);
          setCompletedVectors(savedCompletedVectors);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    const fetchUserDetails = async () => {
      try {
        const userCollection = collection(db, 'userDetails');
        const userSnapshot = await getDocs(userCollection);
        const userData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserDetails(userData);
        console.log("Fetched User Details:", userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
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
    const userDetailsMa = Array.isArray(userDetails)
    ? userDetails.reduce((map, user) => {
        map[user.id] = user; // Assuming user ID is stored in Firestore as 'id'
        return map;
      }, {})
    : {}; //
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
                    orders.map((order) => {
                      const userDetail = userDetailsMa[order.userid] || {}; // Use vector's userId to find details
                      return (

                        <div className="order-card" key={order.id}>
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>Email:</strong> {userDetail.email} <br />
                        <strong>Full Name:</strong> {order.fullName} <br />
                        <strong>Company Name:</strong> {order.company} <br />
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
                   );
                  })
                ) : (
                  <p>No orders found</p> // Message if no vectors
                )}
                </ul>
              </>
            )}

            {activeTab === 'vector-records' && (
              <>
                <h3>All Vectors</h3>
                <ul>
                  {vectors.length > 0 ? (
                    vectors.map((order) => {
                      const userDetail = userDetailsMa[order.userid] || {}; // Use vector's userId to find details
                      return (
                    
                      <div className="order-card" key={order.id}>
                        <strong>Vector ID:</strong> {order.id} <br />
                        <p><strong>Email:</strong> {order.email}</p>
                        <strong>Full Name:</strong> {userDetail.fullName} <br />
        <strong>Company Name:</strong> {userDetail.company} <br />
        <strong>Phone Number:</strong> {userDetail.phone} <br />

     
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
                                 
                          
                              
                                );
                              })
                            ) : (
                              <p>No vectors found</p> // Message if no vectors
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
