import React, { useContext } from 'react';
import Item from '../components/Item';
import { ShopContext } from '../context/ShopContext';

export const BuyCatagory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {all_product.map((item, i) => {
          if (props.catagory === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default BuyCatagory;
