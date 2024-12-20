import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import BlogDetails from "../Components/BlogDetails";

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const [loading, setLoading] = useContext(AppContext);
  const blogId = location.pathname.split("/").at(-1);

  const fetchRelatedBlog = async () => {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();

      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    } catch (error) {
      console.log("Error in blog api call");
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlog();
    }
  }, [location.pathname]);
  return (
    <div className="py-24 max-w-2xl mx-auto">
      <Header />
      <div className="max-w-[720px] px-[25px]">
        <div>
          <button
            className="mb-6 border-2 rounded-md border-[#dfdfdf] py-1 px-4 hover:bg-[#efefef] transition-all"
            onClick={() => navigation(-1)}
          >
            Back
          </button>
        </div>
        {loading ? (
          <div>
            <p>Loading</p>
          </div>
        ) : blog ? (
          <div className="flex flex-col gap-y-10">
            <BlogDetails post={blog} />
            <h2 className="text-3xl font-bold">Related Blogs</h2>
            {relatedBlogs.map((post) => (
              <div key={post.id}>
                <BlogDetails post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No Blog Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
