import { fetchApi } from "@/lib/client";
import { PostCommentDto } from "@/type/postComment";
import { useRouter } from "next/navigation";

const router = useRouter();


export function deletePost (id: number) {
    fetchApi(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      router.replace("/posts");
    });
  };

  export function deletePostComment (postId:number, commentId: number): Promise<PostCommentDto[]>{
    return fetchApi(`/api/v1/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    }).then((data) => {
      alert(data.msg);
      return fetchApi(`/api/v1/posts/${postId}/comments`);
    });
  };

  export function ModifyPostComment (postId: number, postCommenId: number,contentValue: string) : Promise<PostCommentDto[]>{

    fetchApi(`/api/v1/posts/${postId}/comments/${postCommenId}`, {
      method: "PUT",
      body: JSON.stringify({ content: contentValue }),
    }).then((data) => {
      alert(data.msg);
      return fetchApi(`/api/v1/posts/${postId}/comments`); 
    });
  };

  export function insertPostComment (postId:any, commentInput:string): Promise<PostCommentDto[]>{
    return fetchApi(`/api/v1/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        content: commentInput,
      }),
    }).then((data) => {

      alert(data.msg);
      return fetchApi(`/api/v1/posts/${postId}/comments`);

    });
  };
