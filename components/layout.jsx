import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-[4] flex flex-col p-5 overflow-scroll">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
