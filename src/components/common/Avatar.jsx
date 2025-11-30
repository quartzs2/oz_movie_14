import { Image } from "@components";
import { cn } from "@utils";
import { User as UserIcon } from "lucide-react";

export function Avatar({ size = 18, user }) {
  const avatarUrl = user?.user_metadata?.avatar_url;

  if (avatarUrl) {
    return (
      <Image
        alt={"프로필"}
        className="rounded-full object-cover"
        loading="auto"
        src={avatarUrl}
        style={{ height: size, width: size }}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700",
      )}
      style={{ height: size, width: size }}
    >
      <UserIcon
        className="text-gray-500 dark:text-gray-400"
        size={size * 0.6}
      />
    </div>
  );
}
