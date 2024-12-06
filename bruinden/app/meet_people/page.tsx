"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaComments } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

type User = {
  id: string;
  name?: string;
  email?: string;
};

type Comment = {
  id: string;
  text: string;
  userId: string;
  user?: User;
};

type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
  user?: User;
  comments: Comment[];
  createdAt: Date;
};

const MeetPeople: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [opacity, setOpacity] = useState<number>(1);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  const currentUserId = "673d862e31c9d01b481954d9"; //this should be whoever is logged in

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeRate = 0.003;
      const newOpacity = Math.max(0, 1 - scrollPosition * fadeRate);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const createPost = () => {
  //   if (title && content) {
  //     const newPost: Post = {
  //       id: `post${posts.length + 1}`,
  //       title,
  //       content,
  //       userId: currentUserId,
  //       comments: [],
  //       createdAt: new Date(),
  //     };
  //     setPosts([newPost, ...posts]);
  //     setTitle("");
  //     setContent("");
  //   }
  // };

  const createPost = async () => {
    if (title && content) {
      try {
        const response = await fetch("/api/auth/createPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            userId: currentUserId,
          }),
        });

        const newPost = await response.json();
        if (response.ok) {
          setPosts([newPost, ...posts]);
          setTitle("");
          setContent("");
        } else {
          console.error("Failed to create post", newPost);
        }
      } catch (error) {
        console.error("Error creating post", error);
      }
    }
  };

  // const addComment = (postId: string) => {
  //   const text = commentText[postId];
  //   if (text) {
  //     const newComment: Comment = {
  //       id: `comment${Date.now()}`,
  //       text,
  //       userId: currentUserId,
  //     };
  //     setPosts((prevPosts) =>
  //       prevPosts.map((post) =>
  //         post.id === postId
  //           ? { ...post, comments: [...post.comments, newComment] }
  //           : post
  //       )
  //     );
  //     setCommentText({ ...commentText, [postId]: "" });
  //   }
  // };

  const addComment = async (postId: string) => {
    const text = commentText[postId];
    if (text) {
      try {
        const response = await fetch("/api/auth/createComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            postId,
            userId: currentUserId,
          }),
        });

        const newComment = await response.json();
        if (response.ok) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? // Use empty array if comments is undefined
                  { ...post, comments: [...(post.comments || []), newComment] }
                : post
            )
          );
          setCommentText({ ...commentText, [postId]: "" });
        } else {
          console.error("Failed to add comment", newComment);
        }
      } catch (error) {
        console.error("Error adding comment", error);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/auth/getPosts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCommentChange = (postId: string, text: string) => {
    setCommentText({ ...commentText, [postId]: text });
  };

  return (
    //gradient ui stuff so it matches about
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        paddingTop: "5px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "400px",
          overflow: "hidden",
          background:
            "linear-gradient(to bottom, #4A7B9D, #86bbd8, rgba(134, 187, 216, 0.8), rgba(134, 187, 216, 0))",
          opacity: opacity,
          transition: "opacity 0.1s ease-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              color: "#FFFFFF",
            }}
          >
            Connect with Peers
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              marginTop: "20px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              color: "#FFFFFF",
            }}
          >
            Create or Comment on a Post to Meet Your Next Roommate
          </p>
        </div>
      </div>

      <div
        style={{
          padding: "30px",
          textAlign: "center",
          width: "100%",
          maxWidth: "2000px",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            justifyContent: "center",
            textAlign: "center",
            color: "#2f4858",
          }}
        >
          <FiEdit3 color="#2f4858" /> Create a Post
        </h1>
        <hr
          style={{
            border: "3px solid #2f4858",
            marginBottom: "20px",
            width: "100%",
          }}
        />
        <div
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              width: "100%",
              marginBottom: "15px",
              fontSize: "1em",
              backgroundColor: "#f9f9f9",
            }}
            placeholder="Post title..."
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              width: "100%",
              marginBottom: "15px",
              fontSize: "1em",
              minHeight: "120px",
              backgroundColor: "#f9f9f9",
            }}
            placeholder="Post content..."
          />
          <button
            onClick={createPost}
            style={{
              padding: "15px 30px",
              border: "none",
              backgroundColor: "#F6AE2D",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <FiEdit3 style={{ marginRight: "10px" }} /> Create Post
          </button>
        </div>
      </div>

      <div
        style={{
          padding: "30px",
          textAlign: "center",
          width: "100%",
          maxWidth: "2000px",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            justifyContent: "center",
            color: "#2f4858",
          }}
        >
          <FaComments color="#2f4858" /> Posts
        </h1>
        <hr
          style={{
            border: "3px solid #2f4858",
            marginBottom: "20px",
            width: "100%",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
            gap: "20px",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#f0f2f5",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: "20px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.3em",
                  marginBottom: "10px",
                  color: "#2f4858",
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  fontSize: "1em",
                  marginBottom: "10px",
                  color: "#2f4858",
                }}
              >
                {post.content}
              </p>
              <div style={{ marginTop: "15px" }}>
                {post.comments && Array.isArray(post.comments) ? (
                  post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        borderRadius: "5px",
                        backgroundColor: "#E9ECEF",
                        fontSize: "1em",
                        color: "#2f4858",
                      }}
                    >
                      {comment.text}
                    </div>
                  ))
                ) : (
                  <p> No comments </p>
                )}
              </div>
              <input
                type="text"
                value={commentText[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  width: "100%",
                  marginTop: "15px",
                  fontSize: "1em",
                  backgroundColor: "#f9f9f9",
                }}
                placeholder="Add a comment..."
              />
              <button
                onClick={() => addComment(post.id)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "#86BBD8",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontSize: "1em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px auto 0",
                }}
              >
                Comment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetPeople;
