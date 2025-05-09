import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <div className="w-[350px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <Link to={`/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
        <div className="w-full h-56 flex items-center justify-center">
          <img 
            src={image} 
            alt={name} 
            className="max-w-full max-h-full object-contain rounded-t-lg" 
          />
        </div>
      </Link>
      
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-900">{name}</p>

        <div className="flex items-center justify-between mt-2">
          <div className="text-lg font-bold text-green-700">${new_price}</div>
          <div className="text-md text-gray-500 line-through">${old_price}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
