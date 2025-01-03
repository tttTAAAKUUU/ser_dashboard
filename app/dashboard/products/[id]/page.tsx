// "use client";

// import { useParams, useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { products } from "../page";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Image from "next/image";
// import { ArrowLeft, Upload } from "lucide-react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// export default function EditProductPage() {
//   const router = useRouter();
//   const params = useParams();
//   const { id } = params;

//   const product = products.find((product) => product.id === Number(id));

//   const [name, setName] = useState(product ? product.name : "");
//   const [category, setCategory] = useState(product ? product.category : "");
//   const [description, setDescription] = useState(product ? product.description : "");
//   const [price, setPrice] = useState(product ? product.price : 0); // Price as number
//   const [stock, setStock] = useState(product ? product.stock || 0 : 0); // Stock level
//   const [image, setImage] = useState(product ? product.image : "");
//   const [newImage, setNewImage] = useState<File | null>(null);

//   if (!product) {
//     return <p className="text-center text-muted-foreground">Product not found.</p>;
//   }

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setNewImage(file);
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSave = () => {
//     console.log({ id, name, category, description, price, stock, image });
//     alert("Product saved successfully!");
//     router.push("/dashboard/products");
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Button
//         variant="ghost"
//         className="mb-6 flex items-center gap-2"
//         onClick={() => router.push("/dashboard/products")}
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to Products
//       </Button>

//       <Card className="w-full max-w-2xl mx-auto">
//         {/* Header Section with Image */}
//         <CardHeader className="flex flex-wrap justify-between items-start gap-4">
//           <div>
//             <CardTitle className="text-xl sm:text-2xl">Edit Product</CardTitle>
//           </div>
//           <div className="w-32 h-32 sm:w-40 sm:h-40 relative border rounded-md overflow-hidden bg-muted">
//             {image ? (
//               <Image
//                 src={image}
//                 alt="Product Image"
//                 fill
//                 className="object-cover"
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full text-muted-foreground">
//                 No Image
//               </div>
//             )}
//             <div className="mt-2">
//               <Input
//                 id="image"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//               <label htmlFor="image">
//                 <Button
//                   variant="outline"
//                   className="absolute bottom-2 left-2 cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
//                 >
//                   <Upload className="h-4 w-4" />
//                   Replace
//                 </Button>
//               </label>
//             </div>
//           </div>
//         </CardHeader>

//         {/* Form Content */}
//         <CardContent className="space-y-6">
//           {/* Product Name */}
//           <div className="space-y-2">
//             <Label htmlFor="name">Product Name</Label>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter product name"
//             />
//           </div>

//           {/* Category */}
//           <div className="space-y-2">
//             <Label htmlFor="category">Category</Label>
//             <Select onValueChange={(value) => setCategory(value)} defaultValue={category}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Burgers">Burgers</SelectItem>
//                 <SelectItem value="Pizza">Pizza</SelectItem>
//                 <SelectItem value="Ice Cream">Ice Cream</SelectItem>
//                 <SelectItem value="Snack">Snack</SelectItem>
//                 <SelectItem value="Drink">Drink</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Price */}
//           <div className="space-y-2">
//             <Label htmlFor="price">Price (R)</Label>
//             <Input
//               id="price"
//               value={price}
//               onChange={(e) => setPrice(Number(e.target.value))}
//               placeholder="Enter product price"
//               type="number"
//               min="0"
//               step="0.01"
//             />
//           </div>

//           {/* Stock Level */}
//           <div className="space-y-2">
//             <Label htmlFor="stock">Stock Level</Label>
//             <Input
//               id="stock"
//               value={stock}
//               onChange={(e) => setStock(Number(e.target.value))}
//               placeholder="Enter stock level"
//               type="number"
//               min="0"
//               step="1"
//             />
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter product description"
//               rows={4}
//             />
//           </div>
//         </CardContent>

//         {/* Footer Section */}
//         <CardFooter className="flex justify-end space-x-4">
//           <Button variant="ghost" onClick={() => router.push("/dashboard/products")}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave}>Save Changes</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }