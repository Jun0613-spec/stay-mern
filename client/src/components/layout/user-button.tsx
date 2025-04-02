import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuBedSingle,
  LuHotel,
  LuLogOut,
  LuSettings,
  LuUser
} from "react-icons/lu";
import { GoHeart } from "react-icons/go";

import { useLogout } from "@/hooks/auth/use-logout";

import UserAvatar from "../user-avatar";
import UserButtonItems from "./user-button-items";

import { useAuth } from "@/contexts/auth-context";

const UserButton = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { mutate: logout } = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button for Avatar */}
      <div
        className="cursor-pointer outline-none relative"
        onClick={toggleDropdown}
      >
        <UserAvatar
          className="text-sm hover:opacity-80"
          avatarUrl={currentUser?.avatarUrl || ""}
          firstName={currentUser?.firstName}
        />
      </div>

      {/* Dropdown Menu Content */}
      {isOpen && (
        <div className="absolute w-60 h-auto rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 mt-2  overflow-y-auto z-50 50 right-0 md:-right-24 shadow-xl transition-all duration-200 ease-in-out ">
          {/* User Info */}
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <UserAvatar
              className="size-12 text-xl"
              avatarUrl={currentUser?.avatarUrl || ""}
              firstName={currentUser?.firstName}
            />
            <div className="text-center">
              <p className="text-sm font-semibold">
                {currentUser?.firstName} {currentUser?.lastName}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                {currentUser?.email}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <hr className="border-neutral-300 dark:border-neutral-600" />

          <UserButtonItems
            icon={LuUser}
            label="My account"
            onClick={() => {
              setIsOpen(false);
              navigate("/my-account");
            }}
          />

          <hr className="border-neutral-300 dark:border-neutral-600" />

          {currentUser?.role === "BUSINESS" ? (
            <UserButtonItems
              icon={LuHotel}
              label="My accommodations"
              onClick={() => {
                setIsOpen(false);
                navigate("/my-accommodations");
              }}
            />
          ) : (
            <>
              <UserButtonItems
                icon={LuBedSingle}
                label="My bookings"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/my-bookings");
                }}
              />

              <hr className="border-neutral-300 dark:border-neutral-600" />

              <UserButtonItems
                icon={GoHeart}
                label="Saved"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/saved-list");
                }}
              />
            </>
          )}

          <hr className="border-neutral-300 dark:border-neutral-600" />

          <UserButtonItems
            icon={LuSettings}
            label="Settings"
            onClick={() => {
              setIsOpen(false);
              navigate("/settings");
            }}
          />

          <hr className="border-neutral-300 dark:border-neutral-600" />

          <UserButtonItems
            icon={LuLogOut}
            label="Logout"
            onClick={() => logout()}
            className="hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
          />
        </div>
      )}
    </div>
  );
};

export default UserButton;
