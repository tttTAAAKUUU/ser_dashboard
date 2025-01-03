"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/data/products";
import { useSession } from "@clerk/nextjs";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddProducts from "@/components/AddProducts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loader"; // Import the spinner component

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { session } = useSession();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return fetchProducts(token);
    },
    enabled: !!session,
  });

  const categories = ["All", ...Array.from(new Set(products.map((product: Product) => product.category)))];

  const filteredProducts = products.filter((product: Product) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner className="text-pacific-blue w-10 h-10" /> {/* Add size and color classes */}
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Product List</h1>
        <Button
          className="bg-pacific-blue text-white rounded-lg px-4 py-2 shadow hover:bg-cobalt transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Product
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-300 text-gray-700 bg-white px-4 text-sm shadow-sm focus:border-pacific-blue focus:ring focus:ring-light-blue-gradient"
        />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="w-full h-36 overflow-hidden rounded-lg mb-4">
              <Image
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                width={144}
                height={90}
                className="object-cover w-full h-full"
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
        ))}
      </div>

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
};

export default ProductsPage;