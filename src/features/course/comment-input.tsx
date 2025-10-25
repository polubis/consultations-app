import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

type CommentInputProps = {
  placeholder?: string;
  inputName?: string;
  submitAriaLabel?: string;
};

function CommentInput({
  placeholder = "Dodaj komentarz...",
  inputName = "comment",
  submitAriaLabel = "Wyślij komentarz",
}: CommentInputProps) {
  return (
    <div className="flex items-center gap-[16px]">
      <Avatar className="shrink-0">
        <AvatarImage src="/adrian-284.webp" alt="Twój avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1 relative">
        <Input
          type="text"
          name={inputName}
          placeholder={placeholder}
          className="bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.02)] text-foreground placeholder:text-foreground-secondary text-small"
          aria-label={placeholder}
        />
        <button
          type="submit"
          className="absolute right-[24px] top-1/2 -translate-y-1/2"
          aria-label={submitAriaLabel}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[20px] h-[20px] tbt:w-[24px] tbt:h-[24px]"
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
      </div>
    </div>
  );
}

export { CommentInput };
export type { CommentInputProps };
