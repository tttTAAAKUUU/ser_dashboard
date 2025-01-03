"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@clerk/nextjs";

const BACKEND_URL = "https://test-bos-omega.vercel.app";

function AddProducts() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { session } = useSession();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("You need to be logged in to add a product.");
      return;
    }

    try {
      const token = await session.getToken();

      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToBlobStorage(image, token as string);
      }

      const response = await fetch(`${BACKEND_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          category,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
          description,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.statusText}`);
      }

      alert("Product added successfully!");
      setName("");
      setCategory("");
      setPrice("");
      setStock("");
      setDescription("");
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  const uploadImageToBlobStorage = async (file: File, token: string): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("imageFile", file);

      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Image upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.url; // Assuming the backend returns the uploaded image URL as `url`.
    } catch (error) {
      console.error("Image upload error:", error);
      throw new Error("Failed to upload image.");
    }
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>Fill in the details to add a new product.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleAddProduct}>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category (e.g., Food, Drinks)"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              type="number"
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="stock">Stock Level</Label>
            <Input
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock level"
              type="number"
              min="0"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">Product Image</Label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Uploaded Image Preview"
                  width={100}
                  height={100}
                  className="object-cover rounded-lg mx-auto"
                />
              ) : (
                <p className="text-gray-500">
                  Drag and drop an image here, or{" "}
                  <span className="text-blue-600 underline">browse files</span>
                </p>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddProducts;