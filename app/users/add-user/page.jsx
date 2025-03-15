import Layout from "@/components/layout";
import AddUserForm from "@/components/users/add-user/AddUserForm";
import React from "react";

function AddUserPage() {
  return (
    <Layout>
      <AddUserForm />
      {/* <div className="bg-[--bgSoft] p-5 mt-5 rounded-[10px] flex">
        <form action="" className="basic_form flex-1">
          <input
            type="number"
            placeholder="username"
            name="username"
            required
          />
          <input type="number" placeholder="email" name="email" required />
          <input type="text" placeholder="password" name="password" />
          <input type="text" placeholder="phone" name="phone" />
          <select name="isAdmin" id="cat">
            <option value={false}>Is admin</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <textarea
            required
            name="address"
            id="address"
            rows="10"
            placeholder="Address"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div> */}
    </Layout>
  );
}

export default AddUserPage;
