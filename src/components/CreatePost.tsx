import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";
import { useAuth } from "../contexts/AuthContext";
import { fetchCommunities, type Community } from "./CommunityList";

interface PostInput {
  title: string;
  content: string;
  avatar_url: string | null;
  community_id?: number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrlData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicUrlData.publicUrl });

  if (error) throw new Error(error.message);
  return data;
};
const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [communityId, setCommunityId] = useState<number | null>(null);
  const [selectedFile, setSelectedtFile] = useState<File | null>(null);

  const { user } = useAuth();
  // communities add
  const { data: communities } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
    onSuccess: () => {
      setTitle("");
      setContent("");
      setSelectedtFile(null);
      setCommunityId(null);

      alert("Post create successfully");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    mutate({
      post: {
        title,
        content,
        avatar_url: user?.user_metadata.avatar_url || null,
        community_id: communityId,
      },
      imageFile: selectedFile,
    });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedtFile(e.target.files[0]);
    }
  };
  const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCommunityId(value ? Number(value) : null);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto w-full flex flex-col gap-y-6  "
    >
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="title" className=" font-medium min-w-20 pt-2  ">
          Title :
        </label>
        <input
          value={title}
          placeholder="Enter title here"
          type="text"
          id="title"
          required
          onChange={(event) => setTitle(event.target.value)}
          className="block md:flex-1 border border-white/10 bg-transparent p-2 rounded pl-1"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="content" className="font-medium min-w-20 pt-2 ">
          Content :
        </label>
        <textarea
          value={content}
          placeholder="Enter content here"
          id="content"
          required
          rows={5}
          onChange={(event) => setContent(event.target.value)}
          className="block  md:flex-1  border border-white/10 bg-transparent p-2 rounded "
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <label className="font-medium min-w-20 pt-2 " htmlFor="community">
          Select Community :
        </label>
        <select
          className="w-full bg-gray-950 text-white border border-white/10 p-2 rounded outline-none "
          id="community"
          value={communityId || ""}
          onChange={handleCommunityChange}
        >
          <option value="">--Choose Community--</option>
          {communities?.map((community, key) => (
            <option key={key} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 py-2">
        <label htmlFor="image" className=" block mb-2 font-medium mr-5">
          Upload Image :
        </label>
        <label htmlFor="image" className=" block mb-2 font-medium">
          {selectedFile ? (
            <span className="text-sm text-gray-400">
              {selectedFile ? selectedFile.name : ""}
            </span>
          ) : (
            "choose Image "
          )}
        </label>

        <input
          type="file"
          id="image"
          accept="image/*"
          required
          onChange={handleFileChange}
          className="hidden "
        />
      </div>
      <div className="flex justify-center w-full pt-4">
        <button
          type="submit"
          className="w-full md:w-64 bg-purple-500 py-3 rounded-lg font-bold cursor-pointer hover:bg-purple-700  "
        >
          {isPending ? "Creating..." : "Create Post"}
        </button>
      </div>
      {isError && <p className="text-red-500">Error creating post.</p>}
    </form>
  );
};
export default CreatePost;
