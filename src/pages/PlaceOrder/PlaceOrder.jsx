import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, food_list } = useContext(StoreContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate()

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: token,
      address: {
        firstName,
        lastName,
        email,
        street,
        city,
        zipCode,
        state,
        country,
        phone,
      },
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post("https://backendfarmerconnect.onrender.com/placeOrder", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success("Order placed successfully!");
        // navigate('/verify')
        // const {session_url} = response.data
        // window.location.replace(session_url);
        // Additional logic after successful order placement (e.g., redirect or show success message)
      } else {
        toast.error("Error placing order: " + response.data.message);
      }
    } catch (error) {
      toast.error("Error placing order: " + error.message);
    }
  };
  

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount() ===0){
      navigate('/cart')
    }
  }, [token])

  return (
    <form className='place-order'>
      <ToastContainer />
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First name' />
          <input required type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' />
        </div>
        <input required type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' />
        <input required type='text' value={street} onChange={(e) => setStreet(e.target.value)} placeholder='Street' />
        <div className='multi-fields'>
          <input required type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
          <input required type='text' placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className='multi-fields'>
          <input required type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder='Zip code' />
          <input required type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <input required type='text' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={placeOrder} type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
