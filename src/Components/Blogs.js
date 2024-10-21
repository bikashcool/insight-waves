import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Spinner from "./Spinner";

const Blogs = () => {
  const { posts, loading } = useContext(AppContext);
  return (
    <div className="w-11/12 max-w-[730px] py-4 gap-y-8 flex flex-col mt-32 mb-36 justify-center items-center h-screen">
      {loading ? (
        <Spinner />
      ) : !posts || posts.length === 0 ? (
        <div>
          <p>No Post Found</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <p className="font-bold ">{post.title}</p>
            <p className="text-xs py-1">
              By <span className="italic">{post.author}</span> on <span className="underline font-bold">{post.category}</span>
            </p>
            <p className="text-sm">Posted on {post.date}</p>
            <p className="mt-4">{post.content}</p>
            <div className="flex gap-x-3 mt-1">
              {post.tags.map((tag, index) => {
                return (
                  <span
                    className="underline text-blue-800 text-sm"
                    key={index}
                  >{`#${tag}`}</span>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
