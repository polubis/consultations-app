import { Comment } from "@/features/mentoring/comment";
import { useComments } from "@/features/mentoring/use-comments";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

function CommentsSection() {
  const {
    comments,
    toggleInput,
    isInputOpen,
    addComment,
    addNewComment,
    toggleReaction,
    isReactionActive,
  } = useComments();

  const handleNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("new-comment") as string;
    if (value.trim()) {
      addNewComment(value);
      e.currentTarget.reset();
    }
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <Comment
            {...comment}
            onComment={addComment}
            showInput={isInputOpen(comment.id)}
            onToggleInput={() => toggleInput(comment.id)}
            onToggleReaction={toggleReaction}
            isReactionActive={isReactionActive}
          />
          {index < comments.length - 1 && (
            <div className="py-[32px]">
              <div className="w-full h-[1px] bg-[#1A1A1A]" aria-hidden="true" />
            </div>
          )}
        </div>
      ))}

      {/* Separator przed inputem */}
      <div className="py-[32px]">
        <div className="w-full h-[1px] bg-[#1A1A1A]" aria-hidden="true" />
      </div>

      {/* Input do dodawania nowej opinii */}
      <div className="flex items-center gap-3">
        <Avatar className="shrink-0">
          <AvatarImage src="/adrian-284.webp" alt="Twój avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <form onSubmit={handleNewComment} className="flex-1 relative">
          <Input
            type="text"
            name="new-comment"
            placeholder="Dodaj komentarz..."
            className="bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.02)] text-foreground placeholder:text-foreground-secondary"
            aria-label="Dodaj nową opinię"
          />
          <button
            type="submit"
            className="absolute right-[24px] top-1/2 -translate-y-1/2"
            aria-label="Wyślij opinię"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M18.3337 1.66797L9.16699 10.8346M18.3337 1.66797L12.5003 18.3346L9.16699 10.8346M18.3337 1.66797L1.66699 7.5013L9.16699 10.8346"
                stroke="#0BAD67"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export { CommentsSection };
