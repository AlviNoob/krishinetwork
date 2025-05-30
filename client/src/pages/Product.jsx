import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox';
import Breadcrum from '../components/Breadcrum';
import { ShopContext } from '../context/ShopContext';

export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />      
    </div>
  );
};

export default Product;
