'use client';

import { Product } from '../types/product';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function Modal({ isOpen, onClose, product }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <button
            onClick={onClose}
            className="text-lg font-bold text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </div>

        
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-fit rounded-lg mt-4"  
        />
        
        <p className="text-sm text-gray-600 mt-2">{product.category}</p>
        <p className="text-lg font-semibold mt-4">{`Price: $${product.price}`}</p>

        
        <div className="mt-4 text-gray-700 max-h-40 overflow-y-auto">
          {product.description}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
