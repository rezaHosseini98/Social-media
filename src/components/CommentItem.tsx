import { useState } from "react";
import type { Comment } from "./CommentSection";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  comment: Comment & {
    children?: Comment[];
  };
  postId: number;
}
const createReply = async (
  replyContent: string,
  postId: number,
  parentCommentId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error("You must be logged in to reply...");
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: replyContent,
    parent_comment_id: parentCommentId,
    user_id: userId,
    author: author,
  });
  if (error) throw new Error(error.message);
};
const CommentItem = ({ comment, postId }: Props) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (replyContent: string) =>
      createReply(
        replyContent,
        postId,
        comment.id,
        user?.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setReplyText("");
      setShowReply(false);
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyText) return;

    mutate(replyText);
  };

  return (
    <div className="pl-4 border-l border-white/10">
      <div className="mb-2">
        <div className="flex items-center gap-x-2">
          {/* Display the Comments */}

          <span className=" text-sm font-bold text-blue-400">
            {comment.author}
          </span>
          <span className=" text-xs text-gray-500">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-300">{comment.content}</p>
        <button
          className="text-blue-500 text-sm mt-1"
          onClick={() => setShowReply((prev) => !prev)}
        >
          {showReply ? "Cancel Reply" : "Reply"}
        </button>
      </div>
      {showReply && user && (
        <form onSubmit={handleReplySubmit} className="mb-2">
          <textarea
            rows={2}
            className="w-full border border-white/10 bg-transparent p-2 rounded"
            value={replyText}
            placeholder="Write a reply..."
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-center w-full pt-4">
            <button
              type="submit"
              className=" w-full md:w-64 bg-blue-500 py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-700  "
            >
              {isPending ? "Posting..." : "Post Reply"}
            </button>
          </div>
          {isError && <p className="text-red-500">Error posting Reply.</p>}
        </form>
      )}

      {/* show Replies */}

      {comment.children && comment.children.length > 0 && (
        <div>
          <button
            className=" hover:scale-110"
            onClick={() => setIsCollapsed((prev) => !prev)}
            title={isCollapsed ? "Hide Reply" : "Show Reply"}
          >
            {isCollapsed ? (
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
                className="lucide lucide-chevron-up-icon lucide-chevron-up"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            ) : (
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
                className="lucide lucide-chevron-down-icon lucide-chevron-down"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            )}
          </button>
          {isCollapsed && (
            <div className=" gap-y-2">
              {comment.children.map((child, key) => (
                <CommentItem key={key} comment={child} postId={postId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CommentItem;
