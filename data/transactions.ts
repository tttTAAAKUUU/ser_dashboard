export interface Transaction {
  id: string;
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  value: number;
  currency: string;
  status: string;
  blockTimestamp: Date; // Changed from string to Date
  blockNumber: number;
  userId: string;
}

export const BACKEND_URL = "https://test-bos-omega.vercel.app";

/**
 * Fetch transactions from the backend API.
 * @param token Clerk's session token.
 * @returns A list of transactions with normalized structure.
 */
export const fetchTransactions = async (token: string): Promise<Transaction[]> => {
  const response = await fetch(`${BACKEND_URL}/api/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching transactions: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Fetched transactions from API:", data);

  // Normalize data to match the expected structure
  return data.map((txn: any) => ({
    id: txn._id, // Map _id from MongoDB to id
    transactionHash: txn.transactionHash,
    fromAddress: txn.fromAddress,
    toAddress: txn.toAddress,
    value: txn.value,
    currency: txn.currency,
    status: txn.status,
    blockTimestamp: new Date(txn.blockTimestamp), // Convert to Date object
    blockNumber: txn.blockNumber,
    userId: txn.userId,
  }));
};