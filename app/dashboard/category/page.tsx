"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash, Plus, Search } from "lucide-react";
import { useSession } from "@clerk/nextjs";
import { fetchCategories, addCategory, updateCategory, deleteCategory, Category } from "@/data/categories";
import { LoadingSpinner } from "@/components/ui/loader"; // Replace with your own loading spinner component

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete confirmation
  const [confirmationCategory, setConfirmationCategory] = useState<Category | null>(null); // Track category to delete
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { session } = useSession();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        if (!session) {
          console.error("No session found");
          return;
        }

        const token = await session.getToken();
        if (!token) {
          console.error("Authentication token is null");
          return;
        }

        const data = await fetchCategories(token);
        console.log("Fetched Categories in useEffect:", data); // Debug log
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategoriesData();
  }, [session]);

  // Add a new category
  const handleAddCategory = async () => {
    try {
      if (!session) {
        console.error("No session found");
        return;
      }

      const token = await session.getToken();
      if (!token) {
        console.error("Authentication token is null");
        return;
      }

      await addCategory(token, newCategoryName);
      console.log("Added Category:", newCategoryName); // Debug log
      setCategories((prev) => [...prev, { name: newCategoryName }]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category");
    }
  };

  // Update an existing category
  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;

    try {
      if (!session) {
        console.error("No session found");
        return;
      }

      const token = await session.getToken();
      if (!token) {
        console.error("Authentication token is null");
        return;
      }

      await updateCategory(token, selectedCategory.name, newCategoryName);
      console.log(`Updated Category: ${selectedCategory.name} -> ${newCategoryName}`); // Debug log
      setCategories((prev) =>
        prev.map((category) => (category.name === selectedCategory.name ? { name: newCategoryName } : category))
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category");
    }
  };

  // Delete a category
  const handleDeleteCategory = async () => {
    if (!confirmationCategory) return;

    try {
      if (!session) {
        console.error("No session found");
        return;
      }

      const token = await session.getToken();
      if (!token) {
        console.error("Authentication token is null");
        return;
      }

      await deleteCategory(token, confirmationCategory.name);
      console.log("Deleted Category:", confirmationCategory.name); // Debug log
      setCategories((prev) =>
        prev.filter((category) => category.name !== confirmationCategory.name)
      );
      setIsDeleteDialogOpen(false); // Close confirmation dialog
      setConfirmationCategory(null); // Clear the category to delete
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Error deleting category");
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Categories State:", categories); // Debug: Log all categories
  console.log("Filtered Categories:", filteredCategories); // Debug: Log filtered categories

  // Loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner className="text-pacific-blue" /> {/* Replace `Loader` with your loading spinner component */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      {/* Add Category */}
      <div className="mb-6 flex gap-4">
        <Input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
          className="flex-1"
        />
        <Button onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Search Categories */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="pl-8"
          />
        </div>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedCategory(category);
                      setNewCategoryName(category.name);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setConfirmationCategory(category); // Set category for confirmation
                      setIsDeleteDialogOpen(true); // Open delete confirmation dialog
                    }}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Category ID: {index + 1}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>

      {/* Edit Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name"
            />
            <Button onClick={handleUpdateCategory}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-300">
              Are you sure you want to delete the category{" "}
              <span className="font-bold">{confirmationCategory?.name}</span>? This action
              cannot be undone, and the category may have associated products.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="ghost"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteCategory}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}