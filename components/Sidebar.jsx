"use client";
import Image from "next/image";
import MenuLink from "./MenueLink";
import DashboardIcon from "./icons/Dashboard";
import ProductsIcon from "./icons/Products";
import CategoriesIcon from "./icons/Categories";
import OrderIcon from "./icons/Orders";
import AdminIcon from "./icons/Admin";
import SettingsIcon from "./icons/Settings";
import { auth, signOut } from "@/app/auth";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const inactiveIcon = "h-6 w-6";
  const [session, setSession] = useState(null);
  useEffect(() => {
    auth().then((res) => setSession(res?.user));
  }, []);
  async function handleSignOut() {
    await signOut({ redirectTo: "/" });
  }
  return (
    <>
      <div className="sticky top-10">
        <div className="flex items-center gap-5 mb-5">
          <Image
            src={session?.img || "/noavatar.png"}
            className=" rounded-full object-cover"
            alt=""
            width="50"
            height="50"
          />
          <div className="flex flex-col">
            <span className="font-medium ">{session?.name}</span>
            <span className="text-xs text-[--textSoft]">
              {session?.isAdmin ? "Administrator" : "Employee"}
            </span>
          </div>
        </div>
        <nav className="">
          <MenuLink
            path={"/"}
            title={"Dashboard"}
            icon={<DashboardIcon className={inactiveIcon} />}
          />
          <MenuLink
            path={"/products"}
            title={"Products"}
            icon={<ProductsIcon className={inactiveIcon} />}
          />
          <MenuLink
            path={"/categories"}
            title={"Categories"}
            icon={<CategoriesIcon className={inactiveIcon} />}
          />
          <MenuLink
            path={"/orders"}
            title={"Orders"}
            icon={<OrderIcon className={inactiveIcon} />}
          />
          <MenuLink
            path={"/users"}
            title={"Users"}
            icon={<AdminIcon className={inactiveIcon} />}
          />
          <MenuLink
            path={"/settings"}
            title={"Settings"}
            icon={<SettingsIcon className={inactiveIcon} />}
          />
        </nav>
        <button
          onClick={handleSignOut}
          className="p-5 my-[5px] flex items-center gap-[10px] cursor-pointer rounded-[10px] bg-none border-none text-white w-full hover:bg-[#2e374a]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
}
