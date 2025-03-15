"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuLink({ path, icon, title }) {
  const pathname = usePathname();
  let activeStyle = "";
  if (path === "/" ? pathname === "/" : pathname.startsWith(path)) {
    activeStyle = "bg-[#2e374a]";
  }
  return (
    <>
      <Link href={path} className={`sidebar_link ${activeStyle}`}>
        {icon}
        {title}
      </Link>
    </>
  );
}
