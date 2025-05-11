import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Item = (props) => {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useContext(ShopContext);
  const wishlisted = isWishlisted(props.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(props.id);
    } else {
      addToWishlist(props.id);
    }
  };

  return (
    <div className="w-[350px] transform transition-transform duration-500 hover:scale-105 relative">
      {/* Wishlist Heart Icon */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-10 text-2xl focus:outline-none"
        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {wishlisted ? '❤️' : '🤍'}
      </button>
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt={props.name} className="w-full rounded" />
      </Link>
      <p className="mt-2 mb-1 text-gray-800 font-medium">{props.name}</p>

      <div className="flex gap-5 items-center">
        <div className="text-gray-800 text-lg font-semibold">
          ${props.new_price}
        </div>
        <div className="text-gray-500 text-lg line-through">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
