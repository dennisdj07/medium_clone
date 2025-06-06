import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import Topbar from "../components/Topbar";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { blogs, loading } = useBlogs();
  if (loading) {
    return (
      <div>
        <Topbar />
        <div className="flex justify-center">
          <div className="w-screen max-w-screen-md">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Topbar />
      <div className="flex justify-center">
        <div className="w-screen max-w-screen-md">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate="5th June 2025"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
