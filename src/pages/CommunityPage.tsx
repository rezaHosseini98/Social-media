import { useParams } from "react-router";
import CommunityDisplay from "../components/CommunityDisplay";

const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-6 md:pt-20 min-h-screen  w-full ">
      <div className="  px-4 w-full items-center ">
        <CommunityDisplay communityId={Number(id)} />
      </div>
    </div>
  );
};
export default CommunityPage;
