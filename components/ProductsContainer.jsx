"use client"

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

const ProductsContainer = () => {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await fetch('https://dummyjson.com/products?limit=100');
              const data = await res.json();
              setProducts(data.products);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className='m-20'>
            <input
                type="text"
                placeholder="Search products"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='mb-3 bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-6">
                {filteredProducts.map(product => (
                    <ProductCard {...product} />
                ))}
            </div>
        </div>
    )
}

export default ProductsContainer
