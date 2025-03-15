import Layout from "@/components/layout";
import { fetchCategories, fetchProduct } from "@/app/lib/data";
import EditForm from "@/components/products/editProduct/EditForm";
import React from "react";

async function ViewProductPage({ searchParams }) {
  const { id } = await searchParams;
  const product = await fetchProduct(id);
  const categories = await fetchCategories();
  return (
    <Layout>
      <EditForm product={product} categories={categories} />
    </Layout>
  );
}

export default ViewProductPage;
