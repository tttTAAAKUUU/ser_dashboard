"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddProducts from "@/components/AddProducts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://test-bos-omega.vercel.app";

// Define the product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/products`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data: Product[] = await response.json(); // Ensure response is typed
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

  // Filter products by category, stock, and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && product.stock > 0) ||
      (stockFilter === "Low Stock" && product.stock > 0 && product.stock <= 10) ||
      (stockFilter === "Out of Stock" && product.stock === 0);

    return matchesCategory && matchesSearch && matchesStock;
  });

  if (loading) {
    return <div className="p-6 text-white">Loading products...</div>;
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Product List</h1>
        <Button
          className="bg-pacific-blue text-white rounded-lg px-4 py-2 shadow hover:bg-cobalt transition-colors"
          onClick={() => setIsModalOpen(true)} // Opens the modal
        >
          + Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-300 text-gray-700 bg-white px-4 text-sm shadow-sm focus:border-pacific-blue focus:ring focus:ring-light-blue-gradient"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-300 text-gray-700 bg-white px-4 text-sm shadow-sm focus:border-pacific-blue focus:ring focus:ring-light-blue-gradient"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-300 text-gray-700 bg-white px-4 text-sm shadow-sm focus:border-pacific-blue focus:ring focus:ring-light-blue-gradient"
        >
          <option value="All">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/dashboard/products/${product.id}`}>
            <div className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-all">
              <div className="w-full h-36 relative mb-4">
                <Image
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="text-lg font-medium text-white">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-pacific-blue font-bold">R{product.price.toFixed(2)}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    product.stock > 10
                      ? "bg-green-500 text-white"
                      : product.stock > 0
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Add Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <AddProducts />
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ProductsPage;