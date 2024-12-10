"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCart";
import Loading from "../../components/Loading";
import { Product } from "../../types/product";
import { fetchProducts } from "../../utils/fetchProducts";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import Link from "next/link";

export default function ProductDisplayPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const productsPerPage = 8;

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setShowNav(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowNav(true);
  };

  if (!products.length) {
    return <Loading />;
  }

  return (
    <>
      {showNav && <Navbar onSearch={handleSearch} />}
      <div className="px-12 py-5 ">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-fuchsia-600  text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
      <div className="flex items-center justify-center ">
        <Link
          href="/"
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 text-lg font-semibold hover:text-gray-300  items-center  "
        >
          Logout
        </Link>
      </div>
    </>
  );
}
