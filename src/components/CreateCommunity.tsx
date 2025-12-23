import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase-client";

interface CommunityInput {
  name: string;
  description: string;
}

const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase.from("communities").insert(community);
  if (error) throw new Error(error.message);
  return data;
};

const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({ name, description });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto w-full flex flex-col gap-y-6 "
    >
      <h2 className="text-3xl md:text-6xl font-bold mb-10 text-center bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Create New Community
      </h2>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="name" className=" font-medium min-w-20 pt-2  ">
          Community Name :
        </label>
        <input
          value={name}
          placeholder="Enter Community name"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
          className="block md:flex-1 border border-white/10 bg-transparent p-2 rounded pl-1"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <label htmlFor="description" className="font-medium min-w-20 pt-2 ">
          Description :
        </label>
        <textarea
          rows={3}
          value={description}
          placeholder="Enter description here"
          id="description"
          required
          onChange={(e) => setDescription(e.target.value)}
          className="block  md:flex-1  border border-white/10 bg-transparent p-2 rounded "
        />
      </div>
      <div className="flex justify-center w-full pt-4">
        <button className="w-full md:w-64 bg-purple-500 py-3 rounded-lg font-bold cursor-pointer hover:bg-purple-700  ">
          {isPending ? "Creating.." : "Create Community"}{" "}
        </button>
      </div>

      {isError && <p className="text-red-500">Error Creating community</p>}
    </form>
  );
};
export default CreateCommunity;
