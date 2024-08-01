// import React from 'react';
import './Footer.css';
// import footer_log from '../Assets/logo_big.png'
// import instagram_icon from '../Assets/instagram_icon.png';
// import pintester_icon from '../Assets/pintester_icon.png';
// import whatapp_icon from '../Assets/whatsapp_icon.png';
import { assets } from '../../assets/assets';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-logo'>
                <img src={assets.logo_1} alt='' />
                {/* <p>FarmerConnect</p> */}
            </div>
            <ul className='footer-links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className='footer-social-icon'>
                <div className='footer-icons-container'>
                    <img src={assets.instagram} alt='' />
                </div>
                <div className='footer-icons-container'>
                    <img src={assets.whatsup} alt='' />
                </div>
                <div className='footer-icons-container'>
                    <img src={assets.pinterest} alt='' />
                </div>
            </div>
            <div className='footer-copyright'>
                <hr />
                <p>Copyright @ 2023 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
