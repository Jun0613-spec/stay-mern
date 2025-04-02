import { Link, useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "../theme-toggle";
import UserButton from "./user-button";
import Button from "../button";
import { useAuth } from "@/contexts/auth-context";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const isHomePage = location.pathname === "/";

  const { isLoggedIn, currentUser } = useAuth();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 py-6">
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
                    size="sm"
                    onClick={() => navigate("/my-accommodations")}
                  >
                    My Accommodations
                  </Button>
                )}
                {currentUser?.role === "CUSTOMER" && (
                  <Button size="sm" onClick={() => navigate("/my-bookings")}>
                    My Bookings
                  </Button>
                )}
              </>
            )}
          </div>

          <ThemeToggle />
          {isLoggedIn ? (
            <div className="flex items-center justify-between gap-3">
              <UserButton />
              <div className="md:flex flex-col hidden">
                <p className=" font-bold text-sm">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-xs">{currentUser?.email}</p>
              </div>
            </div>
          ) : (
            <>
              {!isAuthPage && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => navigate("/register")}
                    size="sm"
                    variant="primary"
                  >
                    Register
                  </Button>

                  <Button
                    onClick={() => navigate("/login")}
                    size="sm"
                    variant="secondary"
                  >
                    Login
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
