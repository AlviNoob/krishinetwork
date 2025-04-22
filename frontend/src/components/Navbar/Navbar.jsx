import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("Buy");
    const { getTotalCartItems } = useContext(ShopContext); // Correct destructuring

    return (
        <div className="navbar">
            
            {/* Logo Section */}
            <div className="nav-logo">
                <img src={logo} alt="Krishi Network Logo" className="logo_img" />
                <p>Krishi Network</p>
            </div>

            {/* Navigation Menu */}
            <ul className="nav-menu">
                {["Home", "Buy", "Sell", "Rent", "Support"].map((item) => (
                    <li key={item} onClick={() => setMenu(item)}>
                        <Link style={{ textDecoration: "none" }} to={`/${item.toLowerCase()}`}>
                            {item}
                        </Link>
                        {menu === item && <hr />}
                    </li>
                ))}
            </ul>

            
            {/* Login and Cart Section */}
            <div className="nav-login-cart">
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Link to="/cart">
                        <img src={cart_icon} alt="Cart Icon" className="cart_img" />
                    </Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
