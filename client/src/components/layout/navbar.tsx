import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ModeToggle } from "../mode-toggle";

import UserButton from "./user-button";

import { useGetAuthUser } from "@/hooks/auth/use-get-auth-user";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const isHomePage = location.pathname === "/";

  const { isLoggedIn, data: currentUser } = useGetAuthUser();

  return (
    <div className=" dark:bg-neutral-800 py-6 px-2">
      <div className="container mx-auto flex justify-between">
        <div className="tracking-tight">
          <Link to="/" className="cursor-pointer hover:!text-neutral-300">
            <p className="text-xl font-bold text-black dark:text-white hover:opacity-80">
              Stay
            </p>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="md:flex ites-center hidden">
            {isLoggedIn && isHomePage && (
              <>
                {currentUser?.role === "BUSINESS" && (
                  <Button
                    className="flex items-center text-white px-3 font-bold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-900"
                    onClick={() => navigate("/my-accomodations")}
                  >
                    My Accomodations
                  </Button>
                )}
                {currentUser?.role === "CUSTOMER" && (
                  <Button
                    className="flex items-center text-white px-3 font-bold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-900"
                    onClick={() => navigate("/my-bookings")}
                  >
                    My Bookings
                  </Button>
                )}
              </>
            )}
          </div>

          <ModeToggle />
          {isLoggedIn ? (
            <>
              <UserButton />
            </>
          ) : (
            <>
              {!isAuthPage && (
                <>
                  <Link to="/register">
                    <Button
                      size="sm"
                      variant="outline"
                      className="dark:bg-indigo-800 hover:bg-gray-100 dark:hover:bg-indigo-900 text-indigo-800 dark:text-white font-semibold rounded"
                    >
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      size="sm"
                      variant="outline"
                      className="dark:bg-indigo-800 hover:bg-gray-100 dark:hover:bg-indigo-900 text-indigo-800 dark:text-white font-semibold rounded"
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
