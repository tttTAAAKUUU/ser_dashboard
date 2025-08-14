// types/requests.ts

export interface Request {
  id: string;
  title: string;
  name: string;
  date: string;
  time: string;
  description: string;
  address: string;
  area: string;
  price: number;
  stars: number;
}

export const BACKEND_URL = "https://bos-backend-v2-2.vercel.app";

/**
 * Fetch all requests.
 * @param token Clerk's session token.
 */
export const fetchRequests = async (token: string): Promise<Request[]> => {
  const response = await fetch(`${BACKEND_URL}/api/requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching requests: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch a single request by ID.
 * @param id Request ID.
 * @param token Clerk's session token.
 */
export const fetchRequestById = async (id: string, token: string): Promise<Request> => {
  const response = await fetch(`${BACKEND_URL}/api/requests/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching request: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Update a request by ID.
 * @param id Request ID.
 * @param updatedRequest Updated request data.
 * @param token Clerk's session token.
 */
export const updateRequestById = async (
  id: string,
  updatedRequest: Partial<Request>,
  token: string
): Promise<Request> => {
  const response = await fetch(`${BACKEND_URL}/api/requests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedRequest),
  });

  if (!response.ok) {
    throw new Error(`Error updating request: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Delete a request by ID.
 * @param id Request ID.
 * @param token Clerk's session token.
 */
export const deleteRequestById = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${BACKEND_URL}/api/requests/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting request: ${response.statusText}`);
  }
};
