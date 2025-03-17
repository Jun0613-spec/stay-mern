import { Avatar, AvatarImage } from "./ui/avatar";

import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl?: string | null;
  firstName?: string;
  email?: string;
  className?: string;
}

const UserAvatar = ({
  avatarUrl,
  firstName,
  email,
  className
}: UserAvatarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-2.5 py-4",
        className
      )}
    >
      <Avatar className="size-12 transition ">
        <AvatarImage
          alt="user-profile-image"
          src={avatarUrl || "/placeholder.png"}
          className="object-cover"
        />
      </Avatar>

      {/* User Info */}
      <div className="flex flex-col items-center justify-center">
        <p className="flex items-center text-base font-semibold">{firstName}</p>
        <p className="font-medium">{firstName}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
