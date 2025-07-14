import CategoriesLayout from "@/components/categories/CategoriesLayout";
import { fetchCategories } from "@/app/lib/data";
import React from "react";

async function CategoriesPage() {
  const categories = (await fetchCategories()) || [];
  return (
    // <div>hi</div>
    <CategoriesLayout categories={categories} />
  );
}

export default CategoriesPage;
