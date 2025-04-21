import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostById } from "@/store/slices/postSlice";
import { fetchCommentsByPostId } from "@/store/slices/commentsSlice";
import { fetchUserById } from "@/store/slices/usersSlice";
import CommentList from "@/components/Post/CommentList";
import UserInfo from "@/components/User/UserInfo";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FaArrowLeft } from "react-icons/fa";
import clsx from "clsx";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // Get post data from Redux store
  const {
    post,
    status: postStatus,
    error: postError,
  } = useAppSelector((state) => state.post);

  // Get comments data from Redux store
  const {
    comments,
    status: commentsStatus,
    error: commentsError,
  } = useAppSelector((state) => state.comments);

  // Get user data from Redux store
  const {
    user,
    status: userStatus,
    error: userError,
  } = useAppSelector((state) => state.users);

  // Fetch post and comments data when component mounts or id changes
  useEffect(() => {
    if (id) {
      const postId = Number.parseInt(id);
      if (!isNaN(postId)) {
        dispatch(fetchPostById(postId));
        dispatch(fetchCommentsByPostId(postId));
      }
    }
  }, [dispatch, id]);

  // Fetch user data when post data is available
  useEffect(() => {
    if (post?.userId) {
      dispatch(fetchUserById(post.userId));
    }
  }, [dispatch, post?.userId]);

  // Compute loading and error states
  const isLoading = [postStatus, commentsStatus, userStatus].includes(
    "loading"
  );
  const hasError = [postStatus, commentsStatus, userStatus].includes("failed");
  const errorMessage = postError || commentsError || userError;

  // Render loading, error, or not found states
  if (isLoading) return <LoadingSpinner />;
  if (hasError)
    return <ErrorMessage message={errorMessage || "An error occurred"} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className={clsx(
          "inline-flex items-center gap-2",
          "text-blue-600 hover:text-blue-800",
          "transition-colors duration-200 mb-6"
        )}
      >
        <FaArrowLeft className="text-lg" />
        <span>Back to posts</span>
      </Link>

      <article className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>

        {user && (
          <div className="mb-6">
            <UserInfo user={user} />
          </div>
        )}

        <div
          className={clsx(
            "prose max-w-none mb-8",
            "text-gray-700 leading-relaxed"
          )}
        >
          <p>{post.body}</p>
        </div>
      </article>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CommentList comments={comments} />
      </section>
    </div>
  );
}
