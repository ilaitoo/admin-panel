import Layout from "@/components/layout";
import ProductForm from "@/components/products/addProduct/ProductForm";
import { fetchCategories } from "@/app/lib/data";
import React from "react";

async function AddProductPage() {
  const categories = await fetchCategories();
  return (
    <Layout>
      <ProductForm categories={categories} />
    </Layout>
  );
}

export default AddProductPage;
