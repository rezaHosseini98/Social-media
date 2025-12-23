import { Link } from "react-router";
import type { Post } from "./PostList";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <div className=" relative group">
      <div className=" absolute -inset-1 rounded-[20px] bg-linear-to-r from-pink-600 to-purple-600 blur-sm opacity-0 group-hover:opacity-50 transition duration-300 pointer-events-none " />
      <Link to={`/post/${post.id}`} className="block relative z-10">
        <div className="w-80 h-76 bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-[20px] text-white flex flex-col p-5 overflow-hidden transition-colors duration-300 group-hover:bg-gray-800">
          {/* Avatar & Title */}
          <div className="flex items-center gap-x-2">
            {post.avatar_url ? (
              <img
                src={post.avatar_url}
                alt="User Avatar"
                className="w-8.75 h-8.75 rounded-full object-cover"
              />
            ) : (
              <div className="w-8.75 h-8.75 rounded-full bg-linear-to-tl from-[#8A2BE2] to-[#491F70] " />
            )}
            <div className="flex flex-col flex-1">
              <div className=" text-[20px] leading-5.5 font-semibold mt-2 ">
                {post.title}
              </div>
            </div>
          </div>

          {/* Image Banner */}
          <div className="mt-2 flex-1">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full rounded-[20px] object-cover max-h-37.5 mx-auto"
            />
          </div>
          {/* like & comment count */}
          <div className="flex justify-around  items-center">
            <span className="flex cursor-pointer h-10 w-12.5 px-1 items-center justify-center font-extrabold rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-thumbs-up-icon lucide-thumbs-up "
              >
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                <path d="M7 10v12" />
              </svg>
              <span className="ml-2">{post.like_count ?? 0}</span>
            </span>
            <span className="flex cursor-pointer h-10 w-12.5 px-1 items-center justify-center font-extrabold rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle-icon lucide-message-circle"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              </svg>
              <span className="ml-2">{post.comment_count ?? 0}</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PostItem;
