import axios from "axios";
import Topbar from "../components/Topbar";
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const Navigate = useNavigate();
  const insertBlog = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") || ""
          )}`,
        },
      }
    );
    Navigate(`/blog/${response.data.id}`);
  };
  return (
    <div>
      <Topbar />
      <div className="flex justify-center">
        <div className="max-w-screen-md w-full pt-8">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={insertBlog}
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;

export function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <textarea
        rows={8}
        className="block p-2.5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Post your blog here..."
        onChange={onChange}
      ></textarea>
    </div>
  );
}
