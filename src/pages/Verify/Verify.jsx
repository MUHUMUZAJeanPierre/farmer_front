// import React from 'react'
import axios from 'axios';
import './Verify.css';
import {useNavigate, useSearchParams} from 'react-router-dom'
import { useEffect } from 'react';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    console.log(success, orderId);
    const url = "https://backendfarmerconnect.onrender.com";
    const navigate = useNavigate()
    
    const verifyPayment = async()=>{
        const response = await axios.post ("https://backendfarmerconnect.onrender.com/verify",{success, orderId});
        if(response.data.success){
            console.log(response.data.message);
            navigate('/myorders');
        } else{
            console.log(response.data.message);
            navigate('/');
            // alert(response.data.message);
            // setSearchParams({success: null, orderId: null});
        }

    }

    useEffect(()=>{
        verifyPayment();
    }, [])
    return (
    <div className='verify'>
        <div className='spinner'></div>
    </div>
  )
}

export default Verify
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import './Verify.css';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// const Verify = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const success = searchParams.get('success') === 'true'; // Convert to boolean
//   const orderId = searchParams.get('orderId');
//   const navigate = useNavigate();

//   const verifyPayment = async () => {
//     try {
//       const response = await axios.post("https://backendfarmerconnect.onrender.com/verifyOrder", {
//         success: success.toString(), // Ensure it's sent as a string
//         orderId: orderId
//       });

//       if (response.data.success) {
//         console.log(response.data.message);
//         navigate('/myorders');
//       } else {
//         console.log(response.data.message);
//         navigate('/');
//         // Handle error case if needed
//       }
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       // Handle network or server errors
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className='verify'>
//       <div className='spinner'></div>
//     </div>
//   );
// };

// export default Verify;
