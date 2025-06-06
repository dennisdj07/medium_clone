import BlogDetailCard from "../components/BlogDetailCard";
import BlogDetailSkeleton from "../components/BlogDetailSkeleton";
import Topbar from "../components/Topbar";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  if (loading || !blog) {
    return (
      <div>
        <Topbar />
        <BlogDetailSkeleton />
      </div>
    );
  }
  return (
    <div>
      <Topbar />
      <BlogDetailCard blog={blog} />
    </div>
  );
};

export default Blog;
