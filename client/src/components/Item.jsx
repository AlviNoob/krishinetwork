import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className="w-[350px] transform transition-transform duration-500 hover:scale-105">
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
