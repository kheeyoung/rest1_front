"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<PostDto[]>([]);
  //posts 배열의 타입을 지정
  const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
  fetch(`${BASE_URL}/api/v1/posts`)
  .then((res) => res.json())
  .then((data) =>{
    console.log(data);
    setPosts(data);
  });
}, []);

    return (
      <div className="flex flex-col gap-9">
        <h1>글 목록</h1>
        {posts.length==0 && <h1>글 목록이 없습니다.</h1>}
        {posts.length>0 &&
        <ul>{posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.id} : {post.title}</Link>
            </li>
        ))}
          
        </ul>}
      </div>
    );
  }
  