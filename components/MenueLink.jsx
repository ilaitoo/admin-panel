"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuLink({ path, icon, title, closed }) {
  const pathname = usePathname();
  let activeStyle = "";
  if (path === "/" ? pathname === "/" : pathname.startsWith(path)) {
    activeStyle = "bg-[#2e374a] ";
  }
  return (
    <>
      <Link
        href={path}
        className={`${
          closed
            ? `px-5  rounded-xl `
            : ` px-3   flex items-center gap-2  rounded-[10px]`
        } transition-all   ${activeStyle} py-3 flex`}
      >
        <span>{icon}</span>
        <span
          className={`inline-block transition-all duration-500 ${
            closed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          }`}
        >
          {title}
        </span>
      </Link>
    </>
  );
}
