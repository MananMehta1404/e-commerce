"use client"

import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import Button from './Button';

const ProductsContainer = () => {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);

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
        product.title.toLowerCase().includes(searchInput.toLowerCase()) &&
        (minPrice === '' || product.price >= minPrice) &&
        (maxPrice === '' || product.price <= maxPrice)
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className='m-20'>

            {/* Search Bar, Price Range */}
            <div className='flex'>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className='mb-3 mr-10 w-full bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
                <input
                    type="number"
                    placeholder="Enter Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className='mb-3 mr-10 bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
                <input
                    type="number"
                    placeholder="Enter Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className='mb-3 bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-6">
                {currentProducts.map(product => (
                    <ProductCard {...product} />
                ))}
            </div>

            {/* Pagination */}
            <div className='flex justify-center'>
                <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} text='Prev' className='mr-2 btn-primary py-3 px-5' />
                <span className='text-xl my-2 mx-4'>{currentPage}</span>
                <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= filteredProducts.length} text='Next' className='ml-2 btn-primary py-3 px-5' />
            </div>
        </div>
    )
}

export default ProductsContainer
