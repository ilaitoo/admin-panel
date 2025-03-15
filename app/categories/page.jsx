import CategoriesLayout from "@/components/categories/CategoriesLayout";
import Layout from "@/components/layout";
import { fetchCategories } from "@/app/lib/data";
import React from "react";

async function CategoriesPage() {
  const categories = (await fetchCategories()) || [];
  return (
    <Layout>
      <CategoriesLayout categories={categories} />
    </Layout>
  );
}

export default CategoriesPage;
