import { Avatar } from "@components";
import { ROUTE_PATHS } from "@constants";
import { useAuth } from "@hooks";
import {
  LogIn as LogInIcon,
  LogOut as LogOutIcon,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const UserToggle = () => {
  const { signOut, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleNavigateToMyPage = () => {
    navigate(ROUTE_PATHS.MYPAGE);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex cursor-pointer items-center justify-center rounded-md p-1"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <Avatar size={28} user={user} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <div className="py-1">
              <button
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                onClick={handleNavigateToMyPage}
                type="button"
              >
                <UserIcon size={18} />
                마이페이지
              </button>
              <button
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                onClick={handleSignOut}
                type="button"
              >
                <LogOutIcon size={18} />
                로그아웃
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      className="flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700"
      to={ROUTE_PATHS.LOGIN}
    >
      <LogInIcon size={20} />
    </Link>
  );
};

export default UserToggle;
