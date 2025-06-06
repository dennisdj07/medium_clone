import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-4 cursor-pointer">
        <div className="flex">
          <Avatar authorName={authorName} size="small" />
          <div className="pl-2 flex flex-col justify-center font-light">
            {authorName}
          </div>
          <div className="pl-2 flex flex-col justify-center">
            <Circle />
          </div>
          <div className="pl-2 flex flex-col justify-center font-thin text-slate-600">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semi-bold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-sm font-thin text-slate-500 pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({
  authorName,
  size = "small",
}: {
  authorName: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small" ? "w-7 h-7" : "w-8 h-8"
      } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`${
          size === "small" ? "text-sm" : "text-lg"
        } text-gray-600 dark:text-gray-300`}
      >
        {authorName[0]}
      </span>
    </div>
  );
}

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-400"></div>;
}
