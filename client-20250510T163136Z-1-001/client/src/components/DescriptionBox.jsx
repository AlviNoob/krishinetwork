// DescriptionBox.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DescriptionBox = () => {
  const { productId } = useParams();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/products/${productId}`); // ✅ full URL
        const data = await res.json();

        if (!data.success) throw new Error(data.message);
        setDescription(data.product.description || 'No description available.');
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="mx-[170px] my-[120px]">
      <div className="flex">
        <div className="flex items-center justify-center text-base font-semibold w-[171px] h-[70px] border border-gray-300">
          Description
        </div>
        <div className="flex items-center justify-center text-base font-semibold w-[171px] h-[70px] border border-gray-300 bg-[#FBFBFB] text-gray-600">
          Reviews (122)
        </div>
      </div>
      <div className="flex flex-col gap-[25px] border border-gray-300 p-12 pb-[70px]">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
