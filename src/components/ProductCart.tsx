'use client';

import { useDispatch } from 'react-redux';
import { addToCart } from './store/cartSlice';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void; 
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    alert("item added to cart");
    dispatch(addToCart(product));
  };

  return (
    <div className='px-5 py-4'>
      <div
        className="border p-4 rounded-2xl transform transition-transform duration-300 hover:scale-105 shadow-slate-400 hover:shadow-3xl hover:border-2 hover:border-violet-100 h-full flex flex-col shadow-lg hover:shadow-3xl bg-slate-200 ">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-40 object-fit rounded-lg mb-4 "
        />
        <h3 className="font-semibold text-xl text-gray-800 mb-2 truncate cursor-pointer"onClick={onClick} 
        >{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{`Price: $${product.price}`}</p>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
        <button
          onClick={handleAddToCart}
          className="bg-indigo-400 text-white px-4 py-2 rounded-lg mt-auto transition-colors duration-300 hover:indigo-800 hover:ring-2 hover:ring-indigo-100"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
