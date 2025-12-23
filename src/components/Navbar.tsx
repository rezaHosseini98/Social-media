import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { singInWithGitHub, signOut, user } = useAuth();

  const displayName = user?.user_metadata.user_name || user?.email;
  return (
    <nav className=" fixed top-0 w-full z-40 bg-[rgba(20,19,19,0.8)] backdrop-blur-lg border-b border-b-white/10 shadow-lg ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="font-mono text-xl font-bold text-white">
            RH<span className="text-purple-500">.media</span>
          </Link>
          {/* ---Desktop Links */}
          <div className=" hidden md:flex items-center gap-x-8">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to={"/create"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Create Post
            </Link>
            <Link
              to={"/communities"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Communities
            </Link>
            <Link
              to={"/community/create"}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Create Community
            </Link>
          </div>
          {/* DeskTop Auth */}
          <div className=" flex items-center">
            {user ? (
              <div className="flex items-center gap-x-4">
                <span className=" text-gray-300">
                  {displayName.slice(0, 5)}
                </span>
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}

                <button
                  onClick={signOut}
                  className="hidden md:block ml-2 bg-red-500 px-3 py-1 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={singInWithGitHub}
                className="bg-purple-500 px-3 py-1 rounded"
              >
                Sign In With Github
              </button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-bg-[rgba(20,19,19,0.8)] text-center">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to={"/"}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to={"/create"}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Create Post
              </Link>
              <Link
                to={"/communities"}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Communities
              </Link>
              <Link
                to={"/community/create"}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Create Community
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
