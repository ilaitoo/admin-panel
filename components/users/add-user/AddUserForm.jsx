"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AddUserForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (goToProducts) {
      router.push("/users");
    }
  }, [goToProducts, router]);

  const [isUploading, setIsUploading] = useState(undefined);

  async function uploadImage(ev) {
    setIsUploading(true);
    const files = ev.target.files;
    if (files.length > 0) {
      const data = new FormData();
      data.append("file", files[0]);
      const response = await axios.post("/api/upload", data);
      setImage(response.data.link);
      setIsUploading(false);
    }
  }
  async function saveUser(ev) {
    ev.preventDefault();
    const data = { username, email, password, isAdmin, phone, address, image };
    console.log(data);
    await axios.post("/api/users", data);
    setGoToProducts(true);
  }
  return (
    <div className="flex gap-[50px] mt-5">
      <div className="flex-1 h-max">
        <div className=" text-center    bg-[--bgSoft] pb-10 p-5 rounded-[10px] font-bold text-[--textSoft] ">
          <div className="w-full h-[300px] flex items-center justify-center relative rounded-[10px] mb-5 overflow-hidden">
            {!image ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-20 absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 text-gray-600 bottom-14 z-10 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
                <img
                  src={image || "/noavatar.png"}
                  className="opacity-[0.6]"
                  alt="avatar"
                />
              </>
            ) : (
              <img
                src={image || "/noavatar.png"}
                className="max-w-full max-h-full "
                alt="avatar"
              />
            )}
          </div>
          <label className="bg-gray-400 rounded-md p-5  text-[--text]">
            <input
              disabled={isUploading}
              type="file"
              className="hidden"
              onChange={uploadImage}
            />
            Change
          </label>
        </div>
      </div>
      <div className="flex-[3] bg-[--bgSoft] p-5 rounded-[10px]">
        <form onSubmit={saveUser} className="view_product_form">
          <label>Username</label>
          <input
            required
            type="text"
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder={"Username"}
            value={username}
          />
          <label>Email</label>
          <input
            required
            type="email"
            placeholder={"Email"}
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            required
            type="password"
            placeholder={"Password"}
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
          />
          <label>Is Admin</label>
          <select
            required
            value={isAdmin}
            onChange={(ev) => setIsAdmin(ev.target.value)}
          >
            <option value="" defaultValue>
              Is Admin
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Phone</label>
          <input
            type="number"
            placeholder={"Phone"}
            onChange={(ev) => setPhone(ev.target.value)}
            value={phone}
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield] border p-2 rounded"
          />
          <label>Address</label>
          <textarea
            type="text"
            rows={1}
            placeholder={"Address"}
            onChange={(ev) => setAddress(ev.target.value)}
            value={address}
          />
          <div className="w-full flex gap-5 justify-center">
            <button type="submit" className="flex-1">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
