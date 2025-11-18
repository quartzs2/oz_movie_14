import { ROUTE_PATHS } from "@constants";
import { useAuth } from "@hooks";
import { LogIn as LogInIcon, LogOut as LogOutIcon } from "lucide-react";
import { Link } from "react-router";

const UserToggle = () => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (user) {
    return (
      <button
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
        onClick={handleSignOut}
        type="button"
      >
        <LogOutIcon size={18} />
        로그아웃
      </button>
    );
  }

  return (
    <Link
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
      to={ROUTE_PATHS.LOGIN}
    >
      <LogInIcon size={18} />
      로그인
    </Link>
  );
};

export default UserToggle;
