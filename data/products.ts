// @/data/products.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
  }
  
  export const BACKEND_URL = "https://test-bos-omega.vercel.app";
  
  export const fetchProducts = async (token: string): Promise<Product[]> => {
    const response = await fetch(`${BACKEND_URL}/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
  
    return response.json();
  };