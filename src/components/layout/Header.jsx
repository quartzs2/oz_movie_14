import { SearchBar } from "@components/index";
import { ROUTE_PATHS } from "@constants/urls";
import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <div className="mx-auto flex h-16 items-center justify-between bg-neutral-50 px-6 py-2">
        <div className="flex flex-1 justify-start">
          <h1>
            <Link to={ROUTE_PATHS.HOME}>SCARECROW MOVIE</Link>
          </h1>
        </div>
        <div className="flex flex-[1.5] justify-center">
          <SearchBar />
        </div>
        <div className="flex flex-1 justify-end">right side</div>
      </div>
    </header>
  );
};

export default Header;
