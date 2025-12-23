import PostList from "../components/PostList";

const Home = () => {
  return (
    <div className="pt-10 ">
      <h2 className="text-4xl md:text-6xl mb-6 font-bold text-center bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Recent Posts
      </h2>
      <div>
        <PostList />
      </div>
    </div>
  );
};
export default Home;
