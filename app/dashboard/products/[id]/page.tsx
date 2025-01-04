"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import React, { useState } from "react";
import { fetchProductById, updateProductById, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

  const mutation = useMutation({
    mutationFn: async (updatedProduct: Partial<Product>) => {
      if (!session) throw new Error("No session found");
      const token = await session.getToken();
      if (!token) throw new Error("Token is null");
      return updateProductById(id as string, updatedProduct, token);
    },
    onSuccess: () => {
      alert("Product saved successfully!");
      router.push("/dashboard/products");
    },
    onError: (err) => {
      console.error("Failed to save product:", err);
      alert("Failed to save product.");
    },
  });

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });

  React.useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSave = () => {
    mutation.mutate(formData);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
          />
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
          />
          <Input
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            type="number"
            placeholder="Price"
          />
          <Input
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            type="number"
            placeholder="Stock"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}