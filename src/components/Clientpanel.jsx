
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Import auth and db from firebase.js
import { collection, query, where, getDocs,getDoc,doc, vector,updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import FontAwesome icon
import QuickOrderForm from './nextcomp/../quickformagain';
import Quickvectorform from "./nextcomp/../quickorderagain"
 // Import QuickOrderForm
import jsPDF from 'jspdf';
import { connectDataConnectEmulator } from 'firebase/data-connect';
const ClientPanel = () => {
  const [orders, setOrders] = useState([]);
  const [vectors, setvectors] = useState([]);
  const [allRecords, setAllRecords] = useState({ orders: [], vectors: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('order-records'); // Track active tab
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const [userDetails, setUserDetails] = useState({});
   const [rushSelectedOrders, setRushSelectedOrders] = useState({});
   const [rushSelectedVectors, setRushSelectedVectors] = useState({});
   const [expandedOrder, setExpandedOrder] = useState(null);
   const [expandedVector, setExpandedVector] = useState(null);
   const [orderFilter, setOrderFilter] = useState('all'); // 'all', 'pending', 'completed'
const [vectorFilter, setVectorFilter] = useState('all'); // 'all', 'pending', 'completed'

   
    const [showInvoice, setShowInvoice] = useState(null);

// Example call
// Example call







  

   
  // State for sidebar visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserDetails(currentUser.uid); // Ensure you await the fetch
        await fetchUserOrders(currentUser.uid); // Fetch orders only after user details are fetched
        await fetchUservectors(currentUser.uid); // Also fetch vectors
      } else {
        setUser(null);
        setOrders([]); 
        setVectors([]); // Clear orders if no user
        setUserDetails({}); // Clear user details as well
      }
    });
  
    return () => unsubscribe();
  }, []);
  




  const fetchUserDetails = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'userDetails', userId)); // Fetch user details from Firestore
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserDetails(userData); // Set user details
        localStorage.setItem('userDetails', JSON.stringify(userData)); // Store in local storage
      } else {
        console.error("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  // On component mount, check local storage
  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);
  

  const fetchUserOrders = async (userId) => {
    try {
      if (userId) {
        const q = query(
          collection(db, 'orders'),
          where('uid', '==', userId),
         // Filter by user ID (uid)
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      }
    } catch (error) {
      console.error("Error fetching user's orders:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch user orders whenever the user changes
  useEffect(() => {
    if (user) {
      fetchUserOrders(user.uid);
      console.log(user)
    }
  }, [user,orderFilter]);

  const fetchUservectors = async (userId) => {
    try {
      if (userId) {
        const q = query(
          collection(db, 'vectors'),
          where('uid', '==', userId),
         // Filter by user ID (uid)
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setvectors(ordersData);
      }
    } catch (error) {
      console.error("Error fetching user's orders:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch user orders whenever the user changes
  useEffect(() => {
    if (user) {
      fetchUservectors(user.uid);
      console.log(user)
    }
  }, [user,vectorFilter]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
   
  };
   


 

  const generateInvoice = (order) => {
   // Adjust price if Rush is selected
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 30);
    doc.text(`Full Name: ${userDetails.fullName}`, 20, 40);
    doc.text(`Company Name: ${userDetails.company}`, 20, 50);
    doc.text(`Email: ${user.email}`, 20, 60);
    doc.text(`Phone Number: ${userDetails.phone}`, 20, 70);
    doc.text(`Design Name: ${order.designName}`, 20, 80);
    doc.text(`Price: $${order.price}`, 20, 90);
    doc.text(`Order Date: ${order.createdAt.toDate().toLocaleDateString()}`, 20, 100);
    doc.text(`Number of Colors: ${order.numberOfColors}`, 20, 110);
    doc.text(`Color Name: ${order.colorName}`, 20, 120);
    doc.text(`Height: ${order.height}`, 20, 130);
    doc.text(`Width: ${order.width}`, 20, 140);
    doc.text(`Fabric: ${order.fabric}`, 20, 150);
    doc.text(`Expected Delivery: ${order.expectedDelivery}`, 20, 160);
    doc.text(`Artwork URL: ${order.fileUrl}`, 20, 170);
    doc.text(`Comments: ${order.comments}`, 20, 180);
    doc.text(`Order Status: ${order.status}`, 20, 190);

    doc.save(`invoice_${order.id}.pdf`);
  };

  const generateInvoicevector = (order) => {
  // Adjust price if Rush is selected
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 30);
    doc.text(`Full Name: ${userDetails.fullName}`, 20, 40);
    doc.text(`Company Name: ${userDetails.company}`, 20, 50);
    doc.text(`Email: ${user.email}`, 20, 60);
    doc.text(`Phone Number: ${userDetails.phone}`, 20, 70);
    doc.text(`Design Name: ${order.designName}`, 20, 80);
    doc.text(`Price: $${order.price}`, 20, 90);
   
    doc.text(`Number of Colors: ${order.numberOfColors}`, 20, 110);
    doc.text(`Color Name: ${order.colorName}`, 20, 120);
    doc.text(`Height: ${order.height}`, 20, 130);
    doc.text(`Width: ${order.width}`, 20, 140);
    doc.text(`Fabric: ${order.fabric}`, 20, 150);
    doc.text(`Expected Delivery: ${order.expectedDelivery}` , 20, 160);
    doc.text(`Artwork URL: ${order.fileUrl}`, 20, 170);
    doc.text(`Comments: ${order.comments}`, 20, 180);
    doc.text(`Order Status: ${order.status}`, 20, 190);

    doc.save(`invoice_${order.id}.pdf`);
  };





  


const toggleOrderDetails = (orderId) => {
  setExpandedOrder(expandedOrder === orderId ? null : orderId);
};

const toggleVectorDetails = (vectorId) => {
  setExpandedVector(expandedVector === vectorId ? null : vectorId);
};
    
  return (
    <div className="dashboard">
      <aside className={`sidebar   ${sidebarOpen ? 'active' : ''}`}>
        <Link to="/order">
      <button
     
        className="w-full sm:w-1/2 md:w-3/4 lg:w-3/4 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        Click to Order Now
      </button>
      </Link>
      
        <h2 className="text-gray-200 md:text-3xl text-lg font-helveticaLight my-3">Client Panel</h2>
        <ul>
          <li 
            className={activeTab === 'quick-order'  ? 'active' : ''} 
            onClick={() => handleTabClick('quick-order')}
          >
            Quick Order
          </li>
          <li 
            className={activeTab === 'order-records' ? 'active' : ''} 
            onClick={() => handleTabClick('order-records')}
          >
            Order Records
          </li>
          <li 
            className={activeTab === 'invoice' ? 'active' : ''} 
            onClick={() => handleTabClick('invoice')}
          >
          Order Invoice
          </li>
          <li 
            className={activeTab === 'quick-vector' ? 'active' : ''} 
            onClick={() => handleTabClick('quick-vector')}
          >
            Quick Vector Form
          </li>
          <li 
            className={activeTab === 'vector-records' ? 'active' : ''} 
            onClick={() => handleTabClick('vector-records')}
          >
            Vector Records
          </li>
          <li 
            className={activeTab === 'invoicevector' ? 'active' : ''} 
            onClick={() => handleTabClick('invoicevector')}
          >
          Vector Invoice
          </li>
      

        </ul>
      </aside>
      <main className="main-content">
        {/* <button className="hamburger" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button> */}
    
   
        
        {activeTab === 'quick-order' && <QuickOrderForm/>  }
  
        {activeTab === 'quick-vector' && <Quickvectorform/>}
        {activeTab === 'order-records' && (
        <>
     
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <>
              <h2>Order Records</h2>
              <div className="table-responsive ">
              <div class="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th> {/* Phone column added */}
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Design Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rush Job</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.fullName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.email}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.company}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.phone}</td> {/* Display phone */} 
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>${order.price}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.designName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.location}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.isRush ? 'Yes' : 'No'}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.createdAt.toDate().toLocaleDateString()}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          <button onClick={() => toggleOrderDetails(order.id)}>
                            {expandedOrder === order.id ? 'Hide Details' : 'Show Details'}
                          </button>
                        </td>
                      </tr>
                      {expandedOrder === order.id && (
                        <tr>
                          <td colSpan="10" style={{ padding: '8px', backgroundColor: '#f9f9f9' }}>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Number of Colors: {order.numberOfColors}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Height: {order.height}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Width: {order.width}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Fabric: {order.fabric}</p>
                            <p className='font-bold md:text-[15px] text-[10px] font-raleway'>Expected Delivery: {order.expectedDelivery}</p>
                            <p>Artwork:</p> <a className='text-[11px] md:text-[15px]' href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Format: {order.format}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Comments: {order.comments}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Status: {order.status}</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              </div>
              </div>
            </>
          )}
        </>
      )}


{activeTab === 'vector-records' && (
        <>
     
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <>
              <h2>Vectors Records</h2>
              <div className="table-responsive ">
              <div class="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>vector ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th> {/* Phone column added */}
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Design Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>no of colors</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rush Job</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vectors.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.fullName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.email}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.company}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.phone}</td> {/* Display phone */} 
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>${order.price}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.designName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.location}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.isRush ? 'Yes' : 'No'}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.createdAt.toDate().toLocaleDateString()}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          <button onClick={() => toggleVectorDetails(order.id)}>
                            {expandedVector === order.id ? 'Hide Details' : 'Show Details'}
                          </button>
                        </td>
                      </tr>
                      {expandedVector === order.id && (
                        <tr>
                          <td colSpan="10" style={{ padding: '8px', backgroundColor: '#f9f9f9' }}>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>colorname: {order.colorName}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Height: {order.height}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Width: {order.width}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Format: {order.format}</p>
                            <p className='font-bold md:text-[15px] text-[10px] font-raleway'>Expected Delivery: {order.expectedDelivery}</p>
                            <p>Artwork:</p> <a className='text-[11px] md:text-[15px]' href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />

                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Comments: {order.comments}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Status: {order.status}</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              </div>
              </div>
            </>
          )}
        </>
      )}
 {activeTab === 'invoice' && (
        <>
     
          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <>
              <h2>Order Invoices</h2>
              <div className="table-responsive ">
              <div class="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th> {/* Phone column added */}
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Design Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Location</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rush Job</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.fullName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.email}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.company}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.phone}</td> {/* Display phone */} 
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>${order.price}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.designName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.location}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.isRush ? 'Yes' : 'No'}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.createdAt.toDate().toLocaleDateString()}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          <button onClick={() => toggleOrderDetails(order.id)}>
                            {expandedOrder === order.id ? 'Hide Details' : 'Show Details'}
                          </button>
                        </td>
                      </tr>
                      {expandedOrder === order.id && (
                        <tr>
                         <td colSpan="10" style={{ padding: '8px', backgroundColor: '#f9f9f9' }}>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Number of Colors: {order.numberOfColors}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Height: {order.height}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Width: {order.width}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Fabric: {order.fabric}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Format: {order.format}</p>
                            <p className='font-bold md:text-[15px] text-[10px] font-raleway'>Expected Delivery: {order.expectedDelivery}</p>
                            <p>Artwork:</p> <a className='text-[11px] md:text-[15px]' href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />

                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Comments: {order.comments}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Status: {order.status}</p>
                          </td>
                  
                          <button 
                onClick={() => generateInvoice(order)} 
                className="download-button"
              >
                Download Invoice
              </button>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              </div>
              </div>
            </>
          )}
        </>
      )}
      {activeTab === 'invoicevector' && (
        <>
     
          {loading ? (
            <p>Loading vectors...</p>
          ) : (
            <>
              <h2>vector Invoices</h2>
              <div className="table-responsive ">
              <div class="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>vector ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th> {/* Phone column added */}
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Design Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>no of colors</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rush Job</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vectors.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.fullName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.email}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.company}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{userDetails.phone}</td> {/* Display phone */} 
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>${order.price}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.designName}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.location}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.isRush ? 'Yes' : 'No'}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.createdAt.toDate().toLocaleDateString()}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                          <button onClick={() => toggleVectorDetails(order.id)}>
                            {expandedVector === order.id ? 'Hide Details' : 'Show Details'}
                          </button>
                        </td>
                      </tr>
                      {expandedVector === order.id && (
                        <tr>
                         <td colSpan="10" style={{ padding: '8px', backgroundColor: '#f9f9f9' }}>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>ColorName: {order.colorName}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Height: {order.height}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Width: {order.width}</p>

                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Format: {order.format}</p>
                            <p className='font-bold md:text-[15px] text-[10px] font-raleway'>Expected Delivery: {order.expectedDelivery}</p>
                            <p>Artwork:</p> <a className='text-[11px] md:text-[15px]' href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />

                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Comments: {order.comments}</p>
                            <p className='font-bold md:text-[15px] text-[12px] font-raleway'>Status: {order.status}</p>
                          </td>
                  
                          <button 
                onClick={() => generateInvoicevector(order)} 
                className="download-button"
              >
                Download Invoice
              </button>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              </div>
              </div>
            </>
          )}
        </>
      )}
       
       

      </main>
    </div>
  );
};


export default ClientPanel;
