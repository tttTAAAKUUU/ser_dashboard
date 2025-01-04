"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { fetchProductById, updateProductById, deleteProductById, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const { session } = useSession();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return fetchProductById(id as string, token);
    },
    enabled: !!id && !!session,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedProduct: Partial<Product>) => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return updateProductById(id as string, updatedProduct, token);
    },
    onSuccess: () => {
      setShowSuccessAlert(true);
      setTimeout(() => router.push("/dashboard/products"), 2000);
    },
    onError: (err) => {
      console.error("Failed to save product:", err);
      setShowErrorAlert(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return deleteProductById(id as string, token);
    },
    onSuccess: () => {
      setShowSuccessAlert(true);
      setTimeout(() => router.push("/dashboard/products"), 2000);
    },
    onError: (err) => {
      console.error("Failed to delete product:", err);
      setShowErrorAlert(true);
    },
  });

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pacific-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!product) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>Product not found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2 hover:bg-pacific-blue/10"
        onClick={() => router.push("/dashboard/products")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Button>

      <Card className="w-full max-w-3xl mx-auto bg-gray-800 border-gray-700 shadow-xl">
        <CardHeader className="border-b border-gray-700 pb-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-white">Edit Product</CardTitle>
        </CardHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start bg-gray-800 border-b border-gray-700">
            <TabsTrigger value="details" className="text-gray-300 data-[state=active]:text-pacific-blue">Details</TabsTrigger>
            <TabsTrigger value="inventory" className="text-gray-300 data-[state=active]:text-pacific-blue">Inventory</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">Category</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  defaultValue={formData.category}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Burgers">Burgers</SelectItem>
                    <SelectItem value="Pizza">Pizza</SelectItem>
                    <SelectItem value="Ice Cream">Ice Cream</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                    <SelectItem value="Drink">Drink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="inventory">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-300">Price (R)</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  type="number"
                  placeholder="Enter product price"
                  min="0"
                  step="0.01"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-gray-300">Stock Level</Label>
                <Input
                  id="stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  type="number"
                  placeholder="Enter stock level"
                  min="0"
                  step="1"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="flex justify-between space-x-4 border-t border-gray-700 pt-6">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="bg-pacific-blue hover:bg-cobalt"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      {showSuccessAlert && (
        <Alert className="max-w-md mx-auto mt-4 bg-green-600 text-white">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            {updateMutation.isSuccess ? "Product updated successfully!" : "Product deleted successfully!"}
          </AlertDescription>
        </Alert>
      )}

      {showErrorAlert && (
        <Alert variant="destructive" className="max-w-md mx-auto mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {updateMutation.isError ? "Failed to update product." : "Failed to delete product."}
          </AlertDescription>
        </Alert>
      )}
    </motion.div>
  );
}