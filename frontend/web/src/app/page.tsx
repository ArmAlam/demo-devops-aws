/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState("");
  const [isClient, setIsClient] = useState(false);

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/items`);
    const data = await res.json();
    setItems(data);
  };

  const createItem = async () => {
    if (!name.trim()) return; // Prevent empty items
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
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchItems();
    }
  }, [isClient]);

  if (!isClient) return <div>Loading...</div>;

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Demo App</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          style={{
            padding: "10px 15px",
            borderRadius: 5,
            border: "1px solid #ccc",
            width: 250,
            marginRight: 10,
            outline: "none",
            fontSize: 16,
          }}
        />
        <button
          onClick={createItem}
          style={{
            padding: "10px 20px",
            borderRadius: 5,
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0070f3")}
        >
          Add Item
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, maxWidth: 400, margin: "0 auto" }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              background: "#fff",
              padding: "10px 15px",
              marginBottom: 10,
              borderRadius: 5,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              fontSize: 16,
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
