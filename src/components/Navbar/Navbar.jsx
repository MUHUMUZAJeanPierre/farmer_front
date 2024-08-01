// import React from 'react'
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.getItem("token")
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo_1} alt="logo" className="logo" /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#explore-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>products</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className='navbar-right'>
        {/* <img src={assets.search_icon} alt='search icon' /> */}
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.cart_icon} alt='basket icon'  className='cart_icon' /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt='bag icon' /><p>Orders</p></li>
              <hr />
              <Link onClick={logout}>
                <li><img onClick={logout} src={assets.logout_icon} alt='logout image' /><p>LogOut</p></li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
