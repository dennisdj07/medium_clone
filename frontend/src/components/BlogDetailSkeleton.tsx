const BlogDetailSkeleton = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-12 w-full max-w-screen-xl">
          <div className="col-span-8">
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          </div>
          <div className="col-span-4">
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSkeleton;
