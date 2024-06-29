import apiClient from "@/lib/apiClient";
import { PostType, Profile } from "@/types";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

type Props = {
  profile: Profile;
  posts: PostType[];
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { userId } = context.query;

  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);
    const postsResponse = await apiClient.get(`/posts/${userId}`);

    return {
      props: {
        profile: profileResponse.data,
        posts: postsResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const UserProfile = ({ profile, posts }: Props) => {
  const [viewBio, setViewBio] = useState<string>(profile.bio);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newBio, setNewBio] = useState<string>("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await apiClient.post("/users/updateBio", {
        userId: profile.userId,
        bio: newBio,
      });
      if (response.status == 200) {
        setIsEditing(false);
        setViewBio(response.data.bio);
      }
    } catch (err) {
      console.error("更新に失敗しました。", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
              src={profile.profileImageUrl}
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {profile.user.username}
              </h2>
              <div>
                {isEditing ? (
                  <textarea
                    className="w-full p-2 border rounded"
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                  />
                ) : (
                  <p>{viewBio}</p>
                )}
              </div>
              <button
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                onClick={isEditing ? handleSaveClick : handleEditClick}
              >
                {isEditing ? "保存" : "プロフィール編集"}
              </button>
            </div>
          </div>
        </div>
        {posts.map((post: PostType) => (
          <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  alt="User Avatar"
                  src={profile.profileImageUrl}
                />
                <div>
                  <h2 className="font-semibold text-md">
                    {post.author.username}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
