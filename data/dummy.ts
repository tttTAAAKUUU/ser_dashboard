export const transactions = [
    {
      date: "Today",
      data: [
        {
          id: "1234-5678",
          productName: "Beep Burger",
          time: "2:24 PM",
          crypto: "USDT",
          amount: 149.99,
          status: "Success",
          zar: 2750.0,
          daysAgo: 0,
          details: "Purchased via wallet address 0x1234...abcd",
        },
        {
          id: "2345-6789",
          productName: "Cheese Pizza",
          time: "11:18 AM",
          crypto: "ETH",
          amount: 0.005,
          status: "Success",
          zar: 150.0,
          daysAgo: 0,
          details: "Payment confirmed on-chain. Tx hash: 0xabcd...1234",
        },
      ],
    },
    {
      date: "Yesterday",
      data: [
        {
          id: "3456-7890",
          productName: "Black Ice Cream",
          time: "10:18 PM",
          crypto: "USDC",
          amount: 23.99,
          status: "Success",
          zar: 450.0,
          daysAgo: 1,
          details: "Wallet 0x9876...wxyz processed the transaction.",
        },
        {
          id: "4567-8901",
          productName: "Chicken Wings",
          time: "4:54 PM",
          crypto: "DAI",
          amount: 256.58,
          status: "Failed",
          zar: 4600.0,
          daysAgo: 1,
          details: "Transaction failed due to insufficient funds.",
        },
      ],
    },
  ];

  export const staffMembers = [
    {
      id: "1",
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+1234567890",
      role: "Manager",
      status: "Active",
      posStation: "POS-01",
    },
    {
      id: "2",
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "+0987654321",
      role: "Cashier",
      status: "Inactive",
      posStation: null,
    },
    {
        id: "3",
        fullName: "Monica Smith",
        email: "monica.smith@example.com",
        phone: "+0987654451",
        role: "Clerk",
        status: "Inactive",
        posStation: null,
      },
  ];
  
  export const activities = [
    {
      id: "101",
      staffId: "1",
      activity: "Completed a transaction of $250",
      timestamp: "2024-11-29 10:30 AM",
    },
    {
      id: "102",
      staffId: "1",
      activity: "Updated product prices",
      timestamp: "2024-11-28 03:45 PM",
    },
    {
      id: "103",
      staffId: "2",
      activity: "Logged in to the POS system",
      timestamp: "2024-11-27 08:00 AM",
    },
  ];