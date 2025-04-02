import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl?: string | null;
  firstName?: string;
  className?: string;
}

const UserAvatar = ({ avatarUrl, firstName, className }: UserAvatarProps) => {
  return (
    <div className={cn("size-8 rounded-full overflow-hidden", className)}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={firstName || "User Avatar"}
          className=" object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-medium text-white bg-indigo-600 dark:bg-indigo-800 ">
          {firstName ? firstName[0].toUpperCase() : "?"}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
