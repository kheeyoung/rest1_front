"use client";

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<PostDto | null>(null);

  useEffect(() => {
    fetchApi(`/api/v1/posts/${id}`).then(setPost);
  }, []);

  const deletePost = (id: number) => {
    fetchApi(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      router.replace("/posts"); //push도 가능하지만, 스택에 쌓여서 히스토리 남으니 그냥 교체함
    });
  };

  if (post === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>글 상세 보기</h1>

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
    </>
  );
}