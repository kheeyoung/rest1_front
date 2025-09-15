"use client";

import { fetchApi } from "@/lib/client";
import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        const form= e.target;
        const titleInput=form.title;
        const contentInput=form.content;

        if(titleInput.value.length==0){
            alert('제목을 입력해주세요.');
            titleInput.focus();
            return;
        }
        if(contentInput.value.length==0){
            alert('내용을 입력해주세요.');
            contentInput.focus();
            return;
        }

        fetchApi(`/api/v1/posts`, {
            method: "POST",
            body: JSON.stringify({
              title: titleInput.value,
              content: contentInput.value,
            }),
          }).then((data) => {
            
            alert(data.msg);
            router.replace(`/posts/${data.data.post.id}`);
          });
        };
        
    
    
      return (
        <div className="flex flex-col gap-4">
        <h1 className="text-center">새 글 작성</h1>
        <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
          <input className="border border-gray-300 rounded p-2" 
          type="text" name="title" placeholder="제목" />
          <textarea className="border border-gray-300 rounded p-2" 
          name="content" placeholder="내용" />
          <button type="submit">저장</button>
        </form>
      </div>
      );
    }