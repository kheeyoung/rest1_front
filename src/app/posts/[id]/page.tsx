"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [post, setPost] = useState<PostDto|null>(null);
  //posts 배열의 타입을 지정

  const {id}= useParams(); //url의 id가져오기

  const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
  fetch(`${BASE_URL}/api/v1/posts/${id}`)
  .then((res) => res.json())
  .then((data) =>{
    console.log(data);
    setPost(data);
  });
}, []);

    return (
      <div className="flex flex-col gap-9">
        <h1>글 목록</h1>
        {post==null && <h1>글 목록이 없습니다.</h1>}
        {post!=null &&
        <ul>
            <li>{post.id} : {post.title}</li>
            <li>{post.body}</li>
            <li>{post.createDate}</li>
            <li>{post.modifyDate}</li>
        </ul>
        }
      </div>
    );
  }
  