import React, { useState, useContext, useEffect } from 'react';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const {
    getTotalCartItems,
    user,
    setUser,
    setIsSeller,
    setIsExpert,
  } = useContext(ShopContext);

  const [menu, setMenu] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  // Set active menu based on the current pathname
  useEffect(() => {
    const currentPath = location.pathname === '/' ? 'Home' : location.pathname.split('/')[1];
    const capitalized = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
    if (["Buy", "Sell", "Rent", "Support", "Orders"].includes(capitalized)) {
      setMenu(capitalized);
    } else {
      setMenu("Home");
    }
  }, [location]);

  // Handle logout and reset state
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isSeller");
    localStorage.removeItem("isExpert");

    setUser(null);
    setIsSeller(false);
    setIsExpert(false);

    navigate("/");
    setMenu("Home");

    // Optional: force refresh if needed
    window.location.reload();
  };

  const menuItems = ["Home", "Buy", "Sell", "Rent", "Support"];

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md flex-wrap">
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <img src={logo} alt="Krishi Network Logo" className="h-12 w-auto" />
        <p>Krishi Network</p>
      </div>

      <ul className="flex gap-5 text-sm font-bold text-green-600 md:text-base flex-wrap">
        {menuItems.map((item) => {
          const path = item.toLowerCase();
          const linkPath = path === "home" ? "/" : `/${path}`;
          return (
            <li key={item}>
              <Link
                to={linkPath}
                onClick={() => setMenu(item)}
                className={`hover:text-green-600 ${
                  menu === item ? "border-b-2 border-green-600" : ""
                }`}
              >
                {item}
              </Link>
            </li>
          );
        })}
        {user && (
          <li>
            <Link
              to="/orders"
              onClick={() => setMenu("Orders")}
              className={`hover:text-green-600 ${
                menu === "Orders" ? "border-b-2 border-green-600" : ""
              }`}
            >
              My Orders
            </Link>
          </li>
        )}
      </ul>

      <div className="flex items-center gap-4 mt-3 sm:mt-0">
        {user ? (
          <button
            className="px-4 py-1 text-sm font-bold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="px-4 py-1 text-sm font-bold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
              Login
            </button>
          </Link>
        )}

        <div className="relative">
          <Link to="/cart">
            <img src={cart_icon} alt="Cart Icon" className="h-7 w-auto" />
          </Link>
          <div className="absolute -top-2 -right-2 w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full flex items-center justify-center shadow-md">
            {getTotalCartItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
