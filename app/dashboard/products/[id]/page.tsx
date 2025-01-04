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
import Image from "next/image";
import { ArrowLeft, Upload } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const { session } = useSession();

  // Fetch product data
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

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedProduct: Partial<Product>) => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return updateProductById(id as string, updatedProduct, token);
    },
    onSuccess: () => {
      alert("Product updated successfully!");
      router.push("/dashboard/products");
    },
    onError: (err) => {
      console.error("Failed to save product:", err);
      alert("Failed to save product.");
    },
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return deleteProductById(id as string, token);
    },
    onSuccess: () => {
      alert("Product deleted successfully!");
      router.push("/dashboard/products");
    },
    onError: (err) => {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    },
  });

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  if (!product) {
    return <p className="text-center">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.push("/dashboard/products")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Button>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-wrap justify-between items-start gap-4">
          <CardTitle className="text-xl sm:text-2xl">Edit Product</CardTitle>
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative border rounded-md overflow-hidden bg-muted">
            {formData.image ? (
              <Image src={formData.image} alt="Product Image" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No Image
              </div>
            )}
            <div className="mt-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="image">
                <Button
                  variant="outline"
                  className="absolute bottom-2 left-2 cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Upload className="h-4 w-4" />
                  Replace
                </Button>
              </label>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, category: value })} defaultValue={formData.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Burgers">Burgers</SelectItem>
                <SelectItem value="Pizza">Pizza</SelectItem>
                <SelectItem value="Ice Cream">Ice Cream</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
                <SelectItem value="Drink">Drink</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (R)</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              type="number"
              placeholder="Enter product price"
              min="0"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Level</Label>
            <Input
              id="stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              type="number"
              placeholder="Enter stock level"
              min="0"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={4}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between space-x-4">
          <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button onClick={handleSave} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}