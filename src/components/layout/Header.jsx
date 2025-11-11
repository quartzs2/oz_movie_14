import { SearchBar, ThemeToggle } from "@components";
import { ROUTE_PATHS } from "@constants/urls";
import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between bg-neutral-50 px-6 py-2 dark:bg-gray-900">
        <div className="flex flex-1 justify-start">
          <h1>
            <Link
              className="text-gray-900 dark:text-gray-100"
              to={ROUTE_PATHS.HOME}
            >
              OZ MOVIE
            </Link>
          </h1>
        </div>
        <div className="flex flex-[1.5] justify-center">
          <SearchBar />
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
