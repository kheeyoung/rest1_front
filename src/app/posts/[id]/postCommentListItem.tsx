import { fetchApi } from "@/lib/client";
import { PostCommentDto } from "@/type/postComment";
import { useEffect, useState } from "react";
import { deletePostComment, ModifyPostComment } from "./lib";



export function PostCommentListItem({ postId }: { postId: number }) {

  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(null);
  const [modifiedCommentId, setModifiedCommentId] = useState<number | null>(null);

  useEffect(() => {
    fetchApi(`/api/v1/posts/${postId}/comments`).then(setPostComments);
  }, [postId]);

  const handleModifySubmit = (e: React.FormEvent, postCommentId: number, content: string) => {
    e.preventDefault();
    ModifyPostComment(postId, postCommentId, content).then((comments: PostCommentDto[]) => {
      setPostComments(comments);
      setModifiedCommentId(null); 
    });
  };

  const handleDeleteClick = (postCommentId: number) => {
    deletePostComment(postId, postCommentId).then((comments: PostCommentDto[]) => {
      setPostComments(comments);
    });
  };

  if (postComments === null) return <h2> 댓글 없음 </h2>;

  return (
    <>
      {postComments.map((postComment: PostCommentDto) => (
        <div key={postComment.id}>
          {modifiedCommentId === postComment.id ? (
            <form
              className="flex gap-2"
              onSubmit={(e) =>
                handleModifySubmit(e, postComment.id, e.currentTarget.content.value)
              }
            >
              <input
                type="text"
                name="content"
                defaultValue={postComment.body}
                className="border-2 p-2 rounded"
              />
              <button className="border-2 p-2 rounded" type="submit">
                저장
              </button>
            </form>
          ) : (
            <span>{postComment.body}</span>
          )}

          <button
            className="border-2 p-2 rounded"
            onClick={() => {
              if (modifiedCommentId === postComment.id) {
                setModifiedCommentId(null); // 수정 취소
              } else {
                setModifiedCommentId(postComment.id); // 수정 모드 시작
              }
            }}
          >
            {modifiedCommentId === postComment.id ? "수정취소" : "수정"}
          </button>
          
          <button
            className="border-2 p-2 rounded"
            onClick={() => handleDeleteClick(postComment.id)}
          >
            삭제
          </button>
        </div>
      ))}
    </>
  );
}