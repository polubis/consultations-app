// /src/features/course/comments-section.tsx
import { Comment } from "@/features/course/comment";
import { useComments } from "@/features/course/use-comments";
import { CommentInput } from "@/features/course/comment-input";

function CommentsSection() {
  const { comments, toggleInput, isInputOpen, addComment } = useComments();

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <Comment
            {...comment}
            onComment={addComment}
            showInput={isInputOpen(comment.id)}
            onToggleInput={() => toggleInput(comment.id)}
          />
          {index < comments.length - 1 && (
            <div className="">
              <div className="w-full h-[1px] bg-[#1A1A1A]" aria-hidden="true" />
            </div>
          )}
        </div>
      ))}

      <div className="mb-[24px]">
        <div className="w-full h-[1px] bg-[#1A1A1A]" aria-hidden="true" />
      </div>

      <CommentInput
        placeholder="Dodaj komentarz..."
        inputName="new-comment"
        submitAriaLabel="Wyślij opinię"
      />
    </div>
  );
}

export { CommentsSection };
