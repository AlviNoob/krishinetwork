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
    getTotalWishlistItems,
  } = useContext(ShopContext);

  const [menu, setMenu] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();

  // Combined and expanded menu items
  const menuItems = ['Home', 'Buy', 'Sell', 'Rent', 'Support', 'Blog', 'Education', 'AI', 'Messenger'];

  useEffect(() => {
    const currentPath = location.pathname === '/' ? 'Home' : location.pathname.split('/')[1];
    const capitalized = currentPath.charAt(0).toUpperCase() + currentPath.slice(1).toLowerCase();

    if (menuItems.includes(capitalized) || capitalized === 'Orders') {
      setMenu(capitalized);
    } else {
      setMenu('Home');
    }
  }, [location, menuItems]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isSeller');
    localStorage.removeItem('isExpert');

    setUser(null);
    setIsSeller(false);
    setIsExpert(false);

    navigate('/');
    setMenu('Home');
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md flex-wrap">
      <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <img src={logo} alt="Krishi Network Logo" className="h-12 w-auto" />
        <p>Krishi Network</p>
      </div>

      <div className="flex items-center gap-6">
        <ul className="flex gap-6">
          {menuItems.map((item) => (
            <li key={item}>
              <Link
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setMenu(item)}
                className={`text-gray-600 hover:text-green-600 ${
                  menu === item ? 'text-green-600' : ''
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="relative">
            <span role="img" aria-label="wishlist" className="text-2xl">❤️</span>
            {getTotalWishlistItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {getTotalWishlistItems()}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/cart" className="relative">
                <img src={cart_icon} alt="Cart" className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getTotalCartItems()}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-green-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-600 hover:text-green-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
