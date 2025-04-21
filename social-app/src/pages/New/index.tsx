import type React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createPost } from "@/store/slices/postsSlice";
import { fetchAllUsers } from "@/store/slices/usersSlice";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function NewPostPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status: postStatus, error: postError } = useAppSelector(
    (state) => state.posts
  );
  const {
    users,
    status: usersStatus,
    error: usersError,
  } = useAppSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: "",
    body: "",
    userId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {
      title: "",
      body: "",
      userId: "",
    };
    let isValid = true;

    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!body.trim()) {
      errors.body = "Content is required";
      isValid = false;
    }

    if (!userId) {
      errors.userId = "Author is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatch(
        createPost({
          title,
          body,
          userId: Number(userId),
        })
      ).unwrap();

      setSubmitSuccess(true);

      // Reset form
      setTitle("");
      setBody("");
      setUserId("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = usersStatus === "loading" || isSubmitting;

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to posts
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
            <p>Post created successfully! Redirecting to home page...</p>
          </div>
        )}

        {postError && <ErrorMessage message={postError} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title"
              disabled={isSubmitting}
            />
            {formErrors.title && (
              <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author
            </label>
            <select
              id="author"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting || usersStatus === "loading"}
            >
              <option value="">Select an author</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {formErrors.userId && (
              <p className="mt-1 text-sm text-red-600">{formErrors.userId}</p>
            )}
            {usersStatus === "loading" && (
              <p className="mt-1 text-sm text-gray-500">Loading authors...</p>
            )}
            {usersError && (
              <p className="mt-1 text-sm text-red-600">Error loading authors</p>
            )}
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your post content here..."
              disabled={isSubmitting}
            ></textarea>
            {formErrors.body && (
              <p className="mt-1 text-sm text-red-600">{formErrors.body}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
