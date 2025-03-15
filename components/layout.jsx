import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="flex-1 bg-[--bgSoft] p-5 min-h-screen">
        <Sidebar />
      </div>
      <div className="flex-[4] p-5">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
