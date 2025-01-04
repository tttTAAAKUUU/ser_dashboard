"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
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

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    // Fetch product by ID (use actual fetch logic here)
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const product = await response.json();
        console.log("Fetched product:", product); // Debug log
        setFormData(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSave = async () => {
    alert("Product updated successfully!");
    router.push("/dashboard/products");
  };

  const resolvedImage = newImage
    ? formData.image // Local image preview
    : formData.image.startsWith

("http") || formData.image.startsWith("/") // Check for complete or relative URLs
    ? formData.image // Use directly if it's a valid URL
    : `${process.env.NEXT_PUBLIC_BACKEND_URL || "https://bos-pay-client-portal.vercel.app/dashboard"}/${formData.image}`; // Resolve relative URLs by adding a base URL.

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
            {resolvedImage ? (
              <Image src={resolvedImage} alt="Product Image" fill className="object-cover" />
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

        {/* Form Content */}
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
            <Select
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              defaultValue={formData.category}
            >
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
              placeholder="Enter product price"
              type="number"
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
              placeholder="Enter stock level"
              type="number"
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

        {/* Footer Section */}
        <CardFooter className="flex justify-between space-x-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard/products")}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}