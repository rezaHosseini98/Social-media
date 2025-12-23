import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Community[];
};

const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });
  if (isLoading) {
    return <div>Loading Communities...</div>;
  }
  if (error) {
    return <div>Error:{error.message}</div>;
  }
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {data?.map((community, key) => (
        <Link
          to={`/community/${community.id}`}
          className=" block border  border-white/10 p-4 my-2 rounded hover:-translate-y-1 transition transform"
          key={key}
        >
          <div className="text-2xl font-bold text-purple-500 hover:underline">
            {community.name}
          </div>
          <p className="text-gray-400 mt-2">{community.description}</p>
        </Link>
      ))}
    </div>
  );
};
export default CommunityList;
