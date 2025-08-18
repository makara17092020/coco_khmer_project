"use client";

import { useEffect, useState } from "react";

type Category = { id: number; name: string };
type CategoryPartnership = { id: number; name: string };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesPartner, setCategoriesPartner] = useState<
    CategoryPartnership[]
  >([]);
  const [name, setName] = useState("");
  const [namePartner, setNamePartner] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
  };

  const fetchCategoriesPartner = async () => {
    const res = await fetch("/api/categorypartnership");
    const data = await res.json();
    setCategoriesPartner(data);
  };
  const addCategoryPartner = async () => {
    const res = await fetch("/api/categorypartnership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namePartner }),
    });
    if (res.ok) {
      setNamePartner("");
      fetchCategoriesPartner();
    }
  };

  const addCategory = async () => {
    const res = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchCategoriesPartner();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="p-4">
          <h1 className="text-xl font-bold">Categories</h1>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={addCategory}
            className="ml-2 bg-blue-600 text-white px-4 py-2"
          >
            Add
          </button>
          <ul className="mt-4 space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <h1 className="text-xl font-bold">Categories Parnerships</h1>
          <input
            value={namePartner}
            onChange={(e) => setNamePartner(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={addCategoryPartner}
            className="ml-2 bg-blue-600 text-white px-4 py-2"
          >
            Add
          </button>
          <ul className="mt-4 space-y-2">
            {categoriesPartner.map((cat) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
