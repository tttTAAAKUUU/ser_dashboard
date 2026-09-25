// data/products.ts

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const BACKEND_URL = "https://bos-backend-v2-2.vercel.app";

/**
 * Fetch all products.
 * @param token Session token for authentication.
 */
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

/**
 * Fetch a single product by ID.
 * @param id Product ID.
 * @param token Session token for authentication.
 */
export const fetchProductById = async (id: string, token: string): Promise<Product> => {
  const response = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching product: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Update a product by ID.
 * @param id Product ID.
 * @param updatedProduct Updated product data.
 * @param token Session token for authentication.
 */
export const updateProductById = async (
  id: string,
  updatedProduct: Partial<Product>,
  token: string
): Promise<Product> => {
  const response = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedProduct),
  });

  if (!response.ok) {
    throw new Error(`Error updating product: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Delete a product by ID.
 * @param id Product ID.
 * @param token Session token for authentication.
 */
export const deleteProductById = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting product: ${response.statusText}`);
  }
};
