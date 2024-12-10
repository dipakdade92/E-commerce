'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/store/store';
import { removeFromCart } from '../../components/store/cartSlice';
import Navbar from '@/components/Navbar';

export default function CartPage() {
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={handleSearch} /> 
      <div className="px-12">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

        {!filteredItems.length ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4 ">
            {filteredItems.map((item) => (
              <li key={item.id} className="flex flex-col lg:flex-row justify-between items-center p-4 border-black border bg-slate-200 rounded-lg ">
                <div className="flex flex-col items-center space-x-4 md:flex-row ">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-x-4 md:flex-row ">
                  <span>{`Quantity: ${item.quantity}`}</span>
                  <span>{`$${(item.price * item.quantity).toFixed(2)}`}</span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 p-4 bg-gray-100 rounded-lg ">
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold ">{`Total Items: ${totalItems}`}</p>
          <p className="font-semibold">{`Total Price: $${totalPrice.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
