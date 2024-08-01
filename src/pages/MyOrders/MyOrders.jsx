import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import {assets} from '../../../src/assets/assets'
// import assets from '../../assets/assets'

const MyOrders = () => {
  const { token } = useContext(StoreContext); // Ensure token is correctly fetched from context
  const [orders, setOrders] = useState([]); // Renamed state and setter

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://backendfarmerconnect.onrender.com/userorders",
        { userId: "yourUserIdHere" }, // Ensure userId is sent in the body
        { headers: { Authorization: `Bearer ${token}` } } // Assuming token needs to be sent as Bearer token
      );
      setOrders(response.data.data);
      console.log("data",response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
          {orders.map((order,index)=>{
            return(
              <div key={index} className='my-orders-order'>
                  <img src={assets.parcel_icon} alt='parcel_icon'  />
                  <p>{order.items.map((item,index)=>{
                    if(index === order.items.length -1){
                        return item.name+ " x " + item.quantity
                    } 
                    else{
                      return item.name+ " x " + item.quantity +", "
                    }
                  })}
                  </p>
                  <p>${order.amount}</p>
                  <p>Items: {order.items.length}</p>
                  <p><span>&#x25cf;</span><b>{order.status}</b></p>
                  <button onClick={fetchData} >Track Order</button>
              </div>

            )
          })}
      </div>
    </div>
  );
};

export default MyOrders;
