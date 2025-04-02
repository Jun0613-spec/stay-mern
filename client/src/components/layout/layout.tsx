import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./navbar";
import Footer from "./footer";
import Hero from "../hero";
import SearchBar from "./search-bar";

import Spinner from "../spinner";

import { useAuth } from "@/contexts/auth-context";

const Layout = () => {
  const location = useLocation();

  const { currentUser, isLoading } = useAuth();

  const isHomePage = location.pathname === "/";
  const isSearchPage = location.pathname.startsWith("/search");

  const isBusinessUser = currentUser?.role === "BUSINESS";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {isHomePage && <Hero />}

      {(isHomePage || isSearchPage) && !isBusinessUser && (
        <div className="container mx-auto">
          <SearchBar />
        </div>
      )}

      <main className="container mx-auto py-10 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
