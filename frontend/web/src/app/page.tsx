/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState("");
  const [isClient, setIsClient] = useState(false); // Track client-side mounting

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/items`);
    const data = await res.json();
    setItems(data);
  };

  const createItem = async () => {
    await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchItems();
  };

  useEffect(() => {
    setIsClient(true); // Ensure we're on the client-side
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchItems();
    }
  }, [isClient]);

  // Render loading state or fetched data
  if (!isClient) return <div>Loading...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Demo App</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />

      <button onClick={createItem}>Add Item</button>

      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
