import {
  BedSingleIcon,
  HotelIcon,
  LogOut,
  SettingsIcon,
  UserIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { useGetAuthUser } from "@/hooks/auth/use-get-auth-user";
import { useLogout } from "@/hooks/auth/use-logout";

const UserButton = () => {
  const navigate = useNavigate();

  const { data: currentUser } = useGetAuthUser();
  const { mutate: logout } = useLogout();

  if (!currentUser) {
    navigate("/login");

    return;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative cursor-pointer">
        <Avatar className="size-8 transition hover:opacity-65">
          <AvatarImage
            alt={currentUser?.firstName || "User Avatar"}
            src={currentUser?.avatarImage || undefined}
            className="hover:opacity-80 object-cover"
          />
          <AvatarFallback className="font-medium text-white bg-indigo-600 dark:bg-indigo-800 hover:bg-indigo-500 dark:hover:bg-indigo-900 flex items-center justify-center text-sm">
            {currentUser?.firstName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-600"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-12">
            <AvatarImage
              alt={currentUser?.firstName || "User Avatar"}
              src={currentUser?.avatarImage || ""}
              className="object-cover"
            />
            <AvatarFallback className="font-medium text-white bg-indigo-600 dark:bg-indigo-800 flex items-center justify-center text-2xl cursor-default">
              {currentUser?.firstName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="flex items-center text-sm font-semibold">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              {currentUser?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="mb-1 bg-neutral-300 dark:bg-neutral-600" />

        <DropdownMenuItem
          onClick={() => navigate("/profile")}
          className="h-10 flex items-center justify-center font-medium cursor-pointer"
        >
          <UserIcon className="size-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mb-1 bg-neutral-300 dark:bg-neutral-600" />

        {currentUser?.role === "BUSINESS" ? (
          <DropdownMenuItem
            onClick={() => navigate("/my-accomodations")}
            className="h-10 flex items-center justify-center font-medium cursor-pointer"
          >
            <HotelIcon className="size-4" />
            My Accomodations
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => navigate("/my-bookings")}
            className="h-10 flex items-center justify-center font-medium cursor-pointer"
          >
            <BedSingleIcon className="size-4" />
            My Bookings
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="mb-1 bg-neutral-300 dark:bg-neutral-600" />

        <DropdownMenuItem
          onClick={() => navigate("/settings")}
          className="h-10 flex items-center justify-center font-medium cursor-pointer"
        >
          <SettingsIcon className="size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mb-1 bg-neutral-300 dark:bg-neutral-600" />

        <DropdownMenuItem
          onClick={() => logout()}
          className="h-10 flex items-center justify-center  font-medium cursor-pointer  "
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
