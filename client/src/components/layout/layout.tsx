import { Outlet } from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto py-10 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
