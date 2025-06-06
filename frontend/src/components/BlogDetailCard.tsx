import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

const BlogDetailCard = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 gap-x-8 px-10 pt-12 w-full max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="pt-3 text-slate-500">Posted on June 6 2025</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div>Author</div>
            <div className="flex pt-2">
              <div  className="flex flex-col justify-center pr-4">
                <Avatar authorName={blog.author.name} size="big" />
              </div>
              <div>
                <div className="font-bold text-2xl">{blog.author.name}</div>
                <div className="text-slate-500 pt-2">
                  Random catch Phrase about author's ability to grab attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailCard;
