import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  // form state
  const [product, setProduct] = useState({
    name: '',
    old_price: '',
    new_price: '',
    category: '',
    available: true
  });
  const [image, setImage] = useState(null);

  // feedback state
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // list state
  const [products, setProducts] = useState([]);
  const [listError, setListError] = useState('');

  // Fetch all products on mount
  useEffect(() => {
    fetch('http://localhost:4000/products/all')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setListError(err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('old_price', product.old_price);
    formData.append('new_price', product.new_price);
    formData.append('category', product.category);
    formData.append('available', product.available);
    if (image) formData.append('productImage', image);

    try {
      const response = await fetch('http://localhost:4000/products/add', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to add product');
      const data = await response.json();

      // show message
      setMessage('Product added successfully!');

      // clear form
      setProduct({
        name: '',
        old_price: '',
        new_price: '',
        category: '',
        available: true
      });
      setImage(null);

      // append new product to list
      setProducts(prev => [...prev, data.product]);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* --- Add Form --- */}
      <div>
        <h1 className="text-2xl font-bold text-green-800 mb-6">Add Product</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2">Product Title</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Type here"
              required
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="old_price"
                value={product.old_price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Type here"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Offer Price</label>
              <input
                type="number"
                name="new_price"
                value={product.new_price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Type here"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-2">Product Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 mb-2">Upload Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition"
          >
            {loading ? 'Adding…' : 'ADD'}
          </button>

          {message && <p className="mt-2 text-green-600">{message}</p>}
        </form>
      </div>

      {/* --- Products List --- */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Products</h2>
        {listError && <p className="text-red-600">{listError}</p>}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(prod => (
            <div key={prod.id} className="bg-white p-4 rounded shadow">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="font-bold">{prod.name}</h3>
              <p className="line-through text-gray-400">${prod.old_price}</p>
              <p className="text-red-600 font-semibold">${prod.new_price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
