import CreatePost from "../components/CreatePost";

const CreatePostPage = () => {
  return (
    <div className="pt-6 md:pt-20 min-h-screen  w-full ">
      <h2 className="text-3xl md:text-6xl font-bold mb-10 text-center bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Create New Poste
      </h2>
      <div className="  px-4 w-full items-center ">
        <CreatePost />
      </div>
    </div>
  );
};
export default CreatePostPage;
