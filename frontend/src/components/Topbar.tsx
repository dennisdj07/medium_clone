import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="flex justify-between border-b border-slate-200 px-10 py-4">
      <Link to="/blogs">
        <div className="flex flex-col justify-center">Medium</div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1.5 mr-4 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer"
          >
            Publish
          </button>
        </Link>
        <Avatar authorName="Dennis" size="big" />
      </div>
    </div>
  );
};

export default Topbar;
