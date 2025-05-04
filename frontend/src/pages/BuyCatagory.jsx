import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item/Item';
import "../pages/CSS/BuyCatagory.css"

export const BuyCatagory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="buy-catagory">
      <div className="buycategory-products">
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