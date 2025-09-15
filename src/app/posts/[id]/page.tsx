"use client";

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import { PostCommentDto } from "@/type/postComment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { deletePost, deletePostComment, insertPostComment } from "./lib";
import { PostCommentListItem } from "./postCommentListItem";

export default function Home() {
  const { id: postId } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<PostDto | null>(null);
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(null);
  const [newComment, setNewComment] = useState<String | null>(null);

  //댓글 입력창 관리용
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    const form= e.target;
    const commentInput=form.newComment;
    insertPostComment(postId, commentInput).then((comments : PostCommentDto[]) => {
      setPostComments(comments);
    });
};

  useEffect(() => {
    fetchApi(`/api/v1/posts/${postId}`)
      .then(setPost)
      .catch((err) => {
        alert(err);
        router.replace("/posts");
      });

    fetchApi(`/api/v1/posts/${postId}/comments`).then(setPostComments);
  }, []);

  
  if (post === null) {
    return <div>Loading...</div>;
  }
  

  return (
    <>
      <h1 className="p-2">글 상세 보기</h1>

      <div>
        <div>번호 : {post.id}</div>
        <div>제목 : {post.title}</div>
        <div>내용 : {post.body}</div>
      </div>

      <div className="flex gap-4">
        <Link className="border-2 p-2 rounded" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
        <button
          className="border-2 p-2 rounded"
          onClick={() => {
            deletePost(post.id);
          }}
        >
          삭제
        </button>
      </div>

      <h2 className="p-2">댓글 목록</h2>

      {postComments === null && <div>Loading...</div>}

      
      <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <textarea className="border border-gray-300 rounded p-2" 
           name="newComment" placeholder="댓글을 입력해주세요." 
          maxLength={140} onChange={(e)=>setNewComment(e.target.value)}
          />
          <button type="submit"
          >저장</button>
      </form>



      {postComments !== null && postComments.length === 0 && (
        <div>댓글이 없습니다.</div>
      )}
      <PostCommentListItem postId={post.id}/>
    </>
  );
}