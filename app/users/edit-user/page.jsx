import Layout from "@/components/layout";
import EditUserForm from "@/components/users/edit-user/EditUserForm";
import { fetchUser } from "@/app/lib/data";
import React from "react";

async function ViewUserPage({ searchParams }) {
  const { id } = await searchParams;
  const user = await fetchUser(id);
  return (
    <Layout>
      <EditUserForm user={user} />
    </Layout>
  );
}

export default ViewUserPage;
