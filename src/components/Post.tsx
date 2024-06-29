import React from "react";
import { PostType } from "@/types";
import Link from "next/link";
import { useAuth } from "@/context/auth";

type Props = {
  post: PostType;
  onDeletePost: (post: PostType) => Promise<void>;
};

const Post = (props: Props) => {
  const { post, onDeletePost } = props;
  const { user } = useAuth();
  const handleDeleteClick = () => {
    onDeletePost(post);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post.authorId}`}>
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={post.author.profile?.profileImageUrl}
              alt="User Avatar"
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post.author?.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
      <div className="flex flex-row-reverse">
        {user?.id == post.authorId ? (
          <div>
            <button
              className="rounded bg-gray-200 p-2 transition-colors hover:bg-red-400 font-semibold"
              onClick={handleDeleteClick}
            >
              削除
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Post;
