
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Import auth and db from firebase.js
import { collection, query, where, getDocs,getDoc,doc, vector,updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icon
import QuickOrderForm from './nextcomp/quickform';
import Quickvectorform from "./nextcomp/quickorderform"
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
   const [orderFilter, setOrderFilter] = useState('all'); // 'all', 'pending', 'completed'
const [vectorFilter, setVectorFilter] = useState('all'); // 'all', 'pending', 'completed'

   
    const [showInvoice, setShowInvoice] = useState(null);

// Example call
// Example call
const handleRushChange = async (orderId) => {
  setRushSelectedOrders((prev) => {
      const newSelectedOrders = {
          ...prev,
          [orderId]: !prev[orderId], // Toggle the rush status
      };

      console.log('Updated rushSelectedOrders:', newSelectedOrders);
      console.log('Calling updateOrderPrice with orderId:', orderId);

      // Call updateOrderPrice with the new rush status
      updateOrderPrice(orderId, newSelectedOrders[orderId]);
      // Save to local storage
      localStorage.setItem('rushSelectedOrders', JSON.stringify(newSelectedOrders));
      return newSelectedOrders;
  });
};






  
    const handleRushChangeVector = async (orderId) => {
      setRushSelectedVectors((prev) => {
        const newSelectedVectors = {
          ...prev,
          [orderId]: !prev[orderId],
        };
        // Save to local storage
        localStorage.setItem('rushSelectedVectors', JSON.stringify(newSelectedVectors));
        updateVectorPrice(orderId, newSelectedVectors[orderId]); // Update price in Firestore
        return newSelectedVectors;
      });
    };
   // ...other useEffects and functions for fetching data
   
  // State for sidebar visibility

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserDetails(currentUser.uid).then(() => {
          fetchUserOrders(currentUser.uid); // Now fetch orders only after user details are fetched
        });
      } else {
        setUser(null);
        setOrders([]); 
        setvectors([]); // Clear orders if no user
      }
    });
   
    return () => unsubscribe();
  }, []);
  
  // useEffect(() => {
  //   // Load rush selected orders from local storage
  //   const storedRushOrders = JSON.parse(localStorage.getItem('rushSelectedOrders'));
  //   if (storedRushOrders) {
  //     setRushSelectedOrders(storedRushOrders);
  //   }

  //   // Load rush selected vectors from local storage
  //   const storedRushVectors = JSON.parse(localStorage.getItem('rushSelectedVectors'));
  //   if (storedRushVectors) {
  //     setRushSelectedVectors(storedRushVectors);
  //   }
  // }, []);
  


  const fetchUserDetails = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId)); // Fetch user details from Firestore
      if (userDoc.exists()) {
        setUserDetails(userDoc.data()); // Set user details
      } else {
        console.error("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

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
    const finalPrice = order.price + (rushSelectedOrders ? 5 : 0); // Adjust price if Rush is selected
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
    doc.text(`Price: $${finalPrice}`, 20, 90);
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
    const finalPrice = order.price + (rushSelectedVectors ? 5 : 0); // Adjust price if Rush is selected
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
    doc.text(`Price: $${finalPrice}`, 20, 90);
   
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

  const updateOrderPrice = async (orderId, isRush) => {
    try {
        console.log('Updating order price for orderId:', orderId);

        // Fetch the order directly by its ID
        const orderRef = doc(db, 'orders', orderId); // Use the orderId directly
        const orderSnapshot = await getDoc(orderRef);

        if (!orderSnapshot.exists()) {
            console.error("No order found for ID:", orderId);
            return; // Return early if no order is found
        }

        // Get the order data
        const orderData = { id: orderSnapshot.id, ...orderSnapshot.data() };
        console.log('Fetched order data:', orderData);

        // Ensure price is a number and handle rush logic
        let newPrice = orderData.price; // Default price
        if (isRush) {
            newPrice += 5; // Increase price by $5 for rush order
        }

        // Update the order price in Firestore
        await updateDoc(orderRef, { price: newPrice });
        console.log(`Updated order price for order ID: ${orderData.id} to: ${newPrice}`);

    } catch (error) {
        console.error("Error updating order price:", error);
    }
};





  

  const updateVectorPrice = async (id, isRush) => {
    try {
        const vectorRef = doc(db, 'vectors',id);
        const vectorDoc = await getDoc(vectorRef);
        
        // Check if the document exists
        if (!vectorDoc.exists()) {
            console.error("Vector document does not exist.");
            return; // Exit the function early
        }

        const vectorData = vectorDoc.data();
        console.log("Fetching vector document for orderId:", id);

        // Ensure that price is a number before performing operations
        if (typeof vectorData.price !== 'number') {
            console.error("Price is not a number.");
            return; // Exit the function early
        }

        const newPrice = isRush ? vectorData.price + 5 : vectorData.price - 5; // Adjust price

        await updateDoc(vectorRef, {
            price: newPrice,
        });
    } catch (error) {
        console.error("Error updating vector price:", error);
    }
};
    
  return (
    <div className="dashboard">
      <aside className={`sidebar   ${sidebarOpen ? 'active' : ''}`}>
        <h2 className="text-gray-200 text-3xl font-helveticaLight">Client Panel</h2>
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
        <button className="hamburger" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
    
   
        
        {activeTab === 'quick-order' && <QuickOrderForm    rushSelectedOrders={rushSelectedOrders} 
            handleRushChange={handleRushChange}/>} {/* Render QuickOrderForm */}
        {activeTab === 'quick-vector' && <Quickvectorform   rushSelectedVectors={rushSelectedVectors} 
            handleRushChangevector={handleRushChangeVector} />} {/* Render QuickOrderForm */}
        
        {activeTab === 'order-records' && (
          <>
            <h3>Your Orders</h3>
            {loading ? (
              <p>Loading orders...</p>
            ) : (
              <ul>
              {orders.length > 0 ? (
  orders.map((order) => {
    const finalPrice = order.price + (rushSelectedOrders[order.id] ? 5 : 0); // Adjust price if Rush is selected

    return (
      <div className="order-card" key={order.id}>
        <strong>Order ID:</strong> {order.id} <br />
        <strong>Email:</strong> {order.customerEmail} <br />
        <strong>Full Name:</strong> {order.customerName} <br />
        <strong>Company Name:</strong> {order.companyname} <br />
        <strong>Phone Number:</strong> {order.phone} <br />
        <strong>Design Name:</strong> {order.designName} <br />
        <strong>Location:</strong> {order.location} <br />
        <strong>Price:</strong> ${finalPrice} <br /> {/* Use finalPrice here */}
        <strong>Number Of Colors:</strong> {order.numberOfColors} <br />
        <strong>Color Name:</strong> {order.colorName} <br />
        <strong>Height:</strong> {order.height} <br />
        <strong>Width:</strong> {order.width} <br />
        <strong>Fabric:</strong> {order.fabric} <br />
        <strong>Format:</strong> {order.format} <br />
        <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
        <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
        <strong>Comment:</strong> {order.comments} <br />
        <strong>Order Status:</strong> {order.status} <br /> {/* Order Status Field */}
        <strong>Order Date:</strong> {order.createdAt.toDate().toLocaleDateString()}
        <label className='flex '>
          <input 
            type="checkbox" 
            checked={rushSelectedOrders[order.id] || false}
            onChange={() => handleRushChange(order.id)}
          />
          Rush (+$5)
        </label>

      
      </div>
    );
  })
) : (
  <p>No orders found.</p>
)}

</ul>
  )}
  </>
        )}

{activeTab === 'vector-records' && (
          <>
            <h3>Your Vectors</h3>
            {loading ? (
              <p>Loading orders...</p>
            ) : (
              <ul>
              {vector.length > 0 ? (
  vectors.map((order) => {
    const finalPrice = order.price + (rushSelectedVectors[order.id] ? 5 : 0);  // Adjust price if Rush is selected

    return (
      <div className="order-card" key={order.id}>
        <strong>Vector ID:</strong> {order.id} <br />
        <strong>Email:</strong> {order.customerEmail} <br />
        <strong>Full Name:</strong> {order.customerName} <br />
        <strong>Company Name:</strong> {order.companyname} <br />
        <strong>Phone Number:</strong> {order.phone} <br />
        <strong>Design Name:</strong> {order.designName} <br />
     
        <strong>Price:</strong> ${finalPrice} <br /> {/* Use finalPrice here */}
        <strong>Number Of Colors:</strong> {order.location} <br />
        <strong>Color Name:</strong> {order.colorName} <br />
        <strong>Height:</strong> {order.height} <br />
        <strong>Width:</strong> {order.width} <br />
        <strong>Format:</strong> {order.format} <br />
        <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
        <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
        <strong>Comment:</strong> {order.comments} <br />
        <strong>vector Status:</strong> {order.status} <br /> {/* Order Status Field */}
     
        <label className='flex '>
          <input 
            type="checkbox" 
            checked={rushSelectedVectors[order.id] || false} 
            onChange={() => handleRushChangeVector(order.id)}
          />
          Rush (+$5)
        </label>
      
      </div>
    );
  })
) : (
  <p>No orders found.</p>
)}

</ul>
  )}
  </>
        )}
{activeTab === 'invoice' && (
          <>
            <h3>Your Order Invoices</h3>
            {loading ? (
              <p>Loading invoices...</p>
            ) : (
              <ul>
                {orders.length > 0 ? (
                  orders.map((order) => {
                    const finalPrice = order.price + (rushSelectedOrders[order.id] ? 5 : 0); 
                    return(// Adjust price if Rush is selected
                
                    <div className="invoice-card" key={order.id}>
                      <strong>Invoice for Order ID:</strong> {order.id} <br />
                      <strong>Email:</strong> {order.customerEmail} <br />
                      <strong>Full Name:</strong> {order.customerName} <br />
                      <strong>Company Name:</strong> {order.companyname} <br />
                      <strong>Phone Number:</strong> {order.phone} <br />
                      <strong>Design Name:</strong> {order.designName} <br />
                      <strong>Location:</strong> {order.location} <br />
                      <strong>Price:</strong> ${finalPrice} <br />
                      <strong>Number Of Colors:</strong> {order.numberOfColors} <br />
                      <strong>Color Name:</strong> {order.colorName} <br />
                      <strong>Height:</strong> {order.height} <br />
                      <strong>Width:</strong> {order.width} <br />
                      <strong>Fabric:</strong> {order.fabric} <br />
                      <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
                      <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
                      <strong>Comment:</strong> {order.comments} <br />
                      <strong>Order Status:</strong> {order.status} <br /> {/* Order Status Field */}
                      <strong>Order Date:</strong> {order.createdAt.toDate().toLocaleDateString()}
                      <button 
                onClick={() => generateInvoice(order)} 
                className="download-button"
              >
                Download Invoice
              </button>

                    </div>
                    )
})
                ) : (
                  <p>No invoices found.</p>
                )}
                </ul>
            )}
          </>
        )}
        {activeTab === 'invoicevector' && (
          <>
            <h3>Your Vector Invoices</h3>
            {loading ? (
              <p>Loading invoices...</p>
            ) : (
              <ul>
                {vectors.length > 0 ? (
                  vectors.map((order) => {
                    const finalPrice = order.price + (rushSelectedVectors[order.id] ? 5 : 0); 
                    return(// Adjust price if Rush is selected
                
                    <div className="invoice-card" key={order.id}>
                        <strong>Vector ID:</strong> {order.id} <br />
        <strong>Email:</strong> {order.customerEmail} <br />
        <strong>Full Name:</strong> {order.customerName} <br />
        <strong>Company Name:</strong> {order.companyname} <br />
        <strong>Phone Number:</strong> {order.phone} <br />
        <strong>Design Name:</strong> {order.designName} <br />
     
        <strong>Price:</strong> ${finalPrice} <br /> {/* Use finalPrice here */}
        <strong>Number Of Colors:</strong> {order.location} <br />
        <strong>Color Name:</strong> {order.colorName} <br />
        <strong>Height:</strong> {order.height} <br />
        <strong>Width:</strong> {order.width} <br />
        <strong>Format:</strong> {order.format} <br />
        <strong>Expected Delivery:</strong> {order.expectedDelivery} <br />
        <strong>Artwork:</strong> <a href={order.fileUrl} target="_blank" rel="noopener noreferrer">{order.fileUrl}</a> <br />
        <strong>Comment:</strong> {order.comments} <br />
        <strong>vector Status:</strong> {order.status} <br />
                      <button 
                onClick={() => generateInvoicevector(order)} 
                className="download-button"
              >
                Download Invoice
              </button>

                    </div>
                    )
})
                ) : (
                  <p>No invoices found.</p>
                )}
                </ul>
            )}
          </>
        )}
       
       

      </main>
    </div>
  );
};


export default ClientPanel;
