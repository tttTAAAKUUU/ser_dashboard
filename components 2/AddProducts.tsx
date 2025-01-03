import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function AddProducts() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAddProduct = () => {
    console.log({ name, category, price, stock, description, image });
    alert("Product added successfully!");
    // Reset form
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setImage(null);
    setPreviewUrl(null);
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
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
        <CardTitle>Add Product</CardTitle>
        <CardDescription>Fill in the details to add a new product.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          {/* Product Name */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger id="category">
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

          {/* Price */}
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

          {/* Stock Level */}
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

          {/* Description */}
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

          {/* Image Upload */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">Product Image</Label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {previewUrl ? (
                <div className="relative w-full h-40">
                  <Image
                    src={previewUrl}
                    alt="Uploaded Image Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  Drag and drop an image here, or{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    browse files
                  </span>
                </p>
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between left-52">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button onClick={handleAddProduct}>Add Product</Button>
      </CardFooter>
    </Card>
  );
}

export default AddProducts;