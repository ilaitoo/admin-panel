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
import { useEffect, useRef, useState } from "react";
import { LogOut, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

export default function Sidebar() {
  const inactiveIcon = "h-6 w-6";
  const panelRef = useRef(null);
  const imageRef = useRef(null);
  const usernameRef = useRef(null);
  const [session, setSession] = useState(null);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    function handleClickOutside(ev) {
      if (
        panelRef.current &&
        !panelRef.current.contains(ev.target) &&
        !imageRef.current.contains(ev.target) &&
        !usernameRef.current.contains(ev.target)
      ) {
        setShowProfilePanel(false);
      }
    }
    if (showProfilePanel)
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfilePanel]);

  useEffect(() => {
    auth().then((res) => setSession(res?.user));
  }, []);

  async function handleSignOut() {
    await signOut({ redirectTo: "/" });
  }

  return (
    <>
      <div
        className={`${
          closed ? `w-[60px]` : `w-[250px]`
        } bg-[--bgSoft] relative transition-all duration-500 flex flex-col justify-between pt-32 pb-10`}
      >
        <div
          className={`absolute pl-5 transition-all duration-500  top-4 ${
            !closed ? "right-4" : "right-4"
          }`}
        >
          {!closed && (
            <PanelLeftClose
              onClick={() => setClosed(true)}
              className="cursor-pointer"
            />
          )}
          {closed && (
            <PanelLeftOpen
              onClick={() => setClosed(false)}
              className="cursor-pointer"
            />
          )}
        </div>

        <nav
          className={`flex flex-col transition-[margin] duration-1000  gap-10 ${
            closed ? "" : "ml-3"
          }`}
        >
          <MenuLink
            path={"/"}
            title={"Dashboard"}
            icon={<DashboardIcon className={inactiveIcon} />}
            closed={closed}
          />
          <MenuLink
            path={"/products"}
            title={"Products"}
            icon={<ProductsIcon className={inactiveIcon} />}
            closed={closed}
          />
          <MenuLink
            path={"/categories"}
            title={"Categories"}
            icon={<CategoriesIcon className={inactiveIcon} />}
            closed={closed}
          />
          <MenuLink
            path={"/orders"}
            title={"Orders"}
            icon={<OrderIcon className={inactiveIcon} />}
            closed={closed}
          />
          <MenuLink
            path={"/users"}
            title={"Users"}
            icon={<AdminIcon className={inactiveIcon} />}
            closed={closed}
          />
        </nav>

        <div className=" relative pl-5 ">
          <div className="flex items-center gap-5 ">
            <Image
              ref={imageRef}
              onClick={() => setShowProfilePanel((prev) => !prev)}
              src={session?.img || "/noavatar.png"}
              className=" rounded-full object-cover cursor-pointer"
              alt=""
              width="20"
              height="20"
            />
            <div className="flex flex-col">
              <span
                ref={usernameRef}
                onClick={() => setShowProfilePanel((prev) => !prev)}
                className={`inline-block transition-all duration-1000 ${
                  closed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                } font-medium cursor-pointer`}
              >
                {session?.name}
              </span>
              <span
                className={`inline-block transition-all duration-1000 ${
                  closed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                } text-xs text-[--textSoft]`}
              >
                {session?.isAdmin ? "Administrator" : "Employee"}
              </span>
            </div>
          </div>
          {showProfilePanel && (
            <div
              ref={panelRef}
              className="absolute  left-[59px] -top-[180px]  shadow-sm shadow-black py-4 px-3 w-[150px] h-[180px] bg-[#172135]"
            >
              <X
                className=" cursor-pointer"
                onClick={() => setShowProfilePanel(false)}
              />
              <MenuLink
                path={"/settings"}
                title={"Settings"}
                icon={<SettingsIcon className={inactiveIcon} />}
                closed={false}
              />
              <button
                onClick={handleSignOut}
                // className={`p-5 my-[5px] ${
                //   !closed ? "flex" : ""
                // }  items-center gap-[10px] flex cursor-pointer rounded-[10px]   text-white w-full hover:bg-[#2e374a]`}
                className="flex gap-3 items-center text-sm p-5"
              >
                <LogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// "use client";
// import Image from "next/image";
// import MenuLink from "./MenueLink";
// import DashboardIcon from "./icons/Dashboard";
// import ProductsIcon from "./icons/Products";
// import CategoriesIcon from "./icons/Categories";
// import OrderIcon from "./icons/Orders";
// import AdminIcon from "./icons/Admin";
// import SettingsIcon from "./icons/Settings";
// import { auth, signOut } from "@/app/auth";
// import { useEffect, useState } from "react";

// export default function Sidebar() {
//   const inactiveIcon = "h-6 w-6";
//   const [session, setSession] = useState(null);
//   useEffect(() => {
//     auth().then((res) => setSession(res?.user));
//   }, []);
//   async function handleSignOut() {
//     await signOut({ redirectTo: "/" });
//   }
//   const [closed, setClosed] = useState(true);
//   return (
//     <>
//       <div className="flex-1 bg-[--bgSoft] p-5 min-h-screen ">
//         <div className="sticky top-10">
//           <div className="flex items-center gap-5 mb-5">
//             <Image
//               src={session?.img || "/noavatar.png"}
//               className=" rounded-full object-cover"
//               alt=""
//               width="50"
//               height="50"
//             />
//             <div className="flex flex-col">
//               <span className="font-medium ">{session?.name}</span>
//               <span className="text-xs text-[--textSoft]">
//                 {session?.isAdmin ? "Administrator" : "Employee"}
//               </span>
//             </div>
//           </div>
//           <nav className="">
//             <DashboardIcon className={inactiveIcon} />
//             <ProductsIcon className={inactiveIcon} />
//             <CategoriesIcon className={inactiveIcon} />
//             <OrderIcon className={inactiveIcon} />
//             <AdminIcon className={inactiveIcon} />
//             <SettingsIcon className={inactiveIcon} />
//           </nav>
//           {/* <nav className="">
//             <MenuLink
//               path={"/"}
//               title={"Dashboard"}
//               icon={<DashboardIcon className={inactiveIcon} />}
//             />
//             <MenuLink
//               path={"/products"}
//               title={"Products"}
//               icon={<ProductsIcon className={inactiveIcon} />}
//             />
//             <MenuLink
//               path={"/categories"}
//               title={"Categories"}
//               icon={<CategoriesIcon className={inactiveIcon} />}
//             />
//             <MenuLink
//               path={"/orders"}
//               title={"Orders"}
//               icon={<OrderIcon className={inactiveIcon} />}
//             />
//             <MenuLink
//               path={"/users"}
//               title={"Users"}
//               icon={<AdminIcon className={inactiveIcon} />}
//             />
//             <MenuLink
//               path={"/settings"}
//               title={"Settings"}
//               icon={<SettingsIcon className={inactiveIcon} />}
//             />
//           </nav> */}
//           <button
//             onClick={handleSignOut}
//             className="p-5 my-[5px] flex items-center gap-[10px] cursor-pointer rounded-[10px] bg-none border-none text-white w-full hover:bg-[#2e374a]"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
//               />
//             </svg>
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
