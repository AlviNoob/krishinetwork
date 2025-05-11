import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Item from '../components/Item';
import { ShopContext } from '../context/ShopContext';
import SearchBar from '../components/SearchBar';

export const BuyCatagory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    let products = all_product.filter(item => props.catagory === item.category);
    
    if (searchQuery) {
      products = products.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range if set
    if (priceFilter.min !== '' && !isNaN(priceFilter.min)) {
      products = products.filter(item => Number(item.new_price) >= Number(priceFilter.min));
    }
    if (priceFilter.max !== '' && !isNaN(priceFilter.max)) {
      products = products.filter(item => Number(item.new_price) <= Number(priceFilter.max));
    }
    
    setFilteredProducts(products);
  }, [all_product, props.catagory, searchQuery, priceFilter]);

  const handlePriceFilter = (e) => {
    e.preventDefault();
    setPriceFilter({ min: minPrice, max: maxPrice });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <SearchBar />
        </div>
        {/* Price Range Filter */}
        <form onSubmit={handlePriceFilter} className="flex items-center gap-4 mb-6">
          <label className="text-gray-700">Price Range:</label>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            placeholder="Min"
            className="px-2 py-1 border border-gray-300 rounded w-24"
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="px-2 py-1 border border-gray-300 rounded w-24"
          />
          <button
            type="submit"
            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Apply
          </button>
        </form>
        {searchQuery && (
          <p className="text-gray-600 mb-4">
            Search results for: "{searchQuery}"
          </p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No products found matching your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyCatagory;
