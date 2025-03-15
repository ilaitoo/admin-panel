"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

function EditUserForm({ user }) {
  const [username, setUsername] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(user.img || "");
  const [isAdmin, setIsAdmin] = useState(user.isAdmin || false);
  const [address, setAddress] = useState(user.address || "");
  const [phone, setPhone] = useState(user.phone || "");

  const [disabled, setDisabled] = useState(true);

  const [isUploading, setIsUploading] = useState(false);

  const [goToUsersPage, setGoToUsersPage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (goToUsersPage) {
      router.push("/users");
    }
  }, [goToUsersPage, router]);

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
    const data = {
      _id: user._id,
      name: username,
      email,
      password,
      img: image,
      isAdmin,
      address,
      phone,
    };
    await axios.put("/api/users", data);
    setGoToUsersPage(true);
  }
  return (
    <div className="flex gap-[50px] mt-5">
      <div className="flex-1 gap-2 flex flex-col items-center bg-[--bgSoft] p-5 rounded-[10px] font-bold text-[--textSoft] h-max">
        <div className="w-full h-[300px] flex items-center justify-center  rounded-[10px] mb-5 overflow-hidden">
          <img
            src={image || "/noavatar.png"}
            className="max-w-full max-h-full "
            alt="avatar"
          />{" "}
        </div>
        {!disabled && (
          <label className="bg-gray-400 rounded-md p-5  text-center  text-[--text]">
            <input
              disabled={isUploading}
              type="file"
              className="hidden"
              onChange={uploadImage}
            />
            Change
          </label>
        )}
      </div>
      <div className="flex-[3] bg-[--bgSoft] p-5 rounded-[10px]">
        <form onSubmit={saveUser} className="view_user_form">
          <label>Username</label>
          <input
            disabled={disabled}
            type="text"
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder={"username"}
            value={username}
          />
          <label>Email</label>
          <input
            disabled={disabled}
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            placeholder={"Email"}
            value={email}
          />
          <label>Password</label>
          <input
            disabled={disabled}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            placeholder="Password"
            value={password}
          />
          <label>Phone</label>
          <input
            disabled={disabled}
            onChange={(ev) => setPhone(ev.target.value)}
            type="nu
            disabled={!disabled}mber"
            placeholder={"Phone"}
            value={phone}
          />
          <label>Address</label>
          <textarea
            disabled={disabled}
            type="text"
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder={"Address"}
            value={address}
          />
          <label>Is Admin?</label>
          <select
            disabled={disabled}
            onChange={(ev) => setIsAdmin(ev.target.value)}
            value={isAdmin}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <div className="w-full flex gap-5 justify-center">
            <button
              type="submit"
              disabled={disabled ? true : isUploading ? true : false}
              className=" disabled:bg-[#222e46] disabled:cursor-default"
            >
              {isUploading ? "Loading..." : "Save"}
            </button>
            <button
              type="button"
              disabled={isUploading ? true : false}
              onClick={() =>
                setDisabled((prev) => {
                  if (!prev) {
                    setUsername(user.name || "");
                    setEmail(user.email || "");
                    setPassword("");
                    setImage(user.img || "");
                    setIsAdmin(user.isAdmin || false);
                    setAddress(user.address || "");
                    setPhone(user.phone || "");
                    return true;
                  }
                  return false;
                })
              }
              className=" flex-1 disabled:bg-[#222e46] disabled:cursor-default"
            >
              {disabled ? "Update" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
