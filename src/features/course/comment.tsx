import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CommentInput } from "./comment-input";
import { ReactionButton } from "./reaction-button";
import type { ReactionType } from "./use-comments";

type CommentProps = {
  id: string;
  rating?: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    fallback: string;
  };
  reactions: {
    fire?: number;
    heart?: number;
    lightbulb?: number;
    thumbsUp?: number;
  };
  replies?: CommentProps[];
  onComment?: (commentId: string, content: string) => void;
  isReply?: boolean;
  showInput?: boolean;
  onToggleInput?: () => void;
  onToggleReaction?: (commentId: string, reactionType: ReactionType) => void;
  isReactionActive?: (commentId: string, reactionType: ReactionType) => boolean;
};

function Comment({
  id,
  rating,
  content,
  author,
  reactions,
  replies,
  onComment,
  isReply = false,
  showInput = false,
  onToggleInput,
  onToggleReaction,
  isReactionActive,
}: CommentProps) {
  const hasReplies = replies && replies.length > 0;

  return (
    <div className={isReply ? "mt-[24px] tbt:mt-[32px]" : "mt-[48px] dsp:mt-0"}>
      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-x-[4px] mb-[8px] tbt:mb-[16px]">
          <p className="text-primary-500 font-500 text-regular">{rating}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-500"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      )}

      {/* Author - dla replies nad contentem */}
      {isReply && (
        <div className="flex items-center gap-[8px] mb-[8px] tbt:mb-[16px]">
          <Avatar className="h-[24px] w-[24px]">
            <AvatarImage
              src={author.avatar}
              alt={author.name}
              className="w-full h-full"
            />
            <AvatarFallback>{author.fallback}</AvatarFallback>
          </Avatar>
          <span className="text-foreground font-500 text-regular">
            {author.name}
          </span>
        </div>
      )}

      {/* Content */}
      <blockquote>
        <p className="text-foreground text-regular leading-[150%]">{content}</p>
      </blockquote>

      {/* Author - dla głównych komentarzy pod contentem */}
      {!isReply && (
        <div className="flex items-center gap-[8px] py-[8px] tbt:py-[16px]">
          <Avatar className="h-[24px] w-[24px]">
            <AvatarImage
              src={author.avatar}
              alt={author.name}
              className="w-full h-full"
            />
            <AvatarFallback>{author.fallback}</AvatarFallback>
          </Avatar>
          <span className="text-foreground font-400 text-regular">
            {author.name}
          </span>
        </div>
      )}

      {/* Reactions - z przyciskiem Skomentuj tylko dla głównych komentarzy */}
      {!isReply ? (
        <div className="flex items-center gap-[16px] sbl:gap-[24px]">
          {reactions.fire && reactions.fire > 0 && (
            <ReactionButton
              type="fire"
              count={reactions.fire}
              isActive={isReactionActive?.(id, "fire")}
              onClick={() => onToggleReaction?.(id, "fire")}
              ariaLabel={`${reactions.fire} reakcji ogień`}
            />
          )}

          {reactions.heart && reactions.heart > 0 && (
            <ReactionButton
              type="heart"
              count={reactions.heart}
              isActive={isReactionActive?.(id, "heart")}
              onClick={() => onToggleReaction?.(id, "heart")}
              ariaLabel={`${reactions.heart} polubień`}
            />
          )}

          {reactions.lightbulb && reactions.lightbulb > 0 && (
            <ReactionButton
              type="lightbulb"
              count={reactions.lightbulb}
              isActive={isReactionActive?.(id, "lightbulb")}
              onClick={() => onToggleReaction?.(id, "lightbulb")}
              ariaLabel={`${reactions.lightbulb} reakcji żarówka`}
            />
          )}

          {reactions.thumbsUp && reactions.thumbsUp > 0 && (
            <ReactionButton
              type="thumbsUp"
              count={reactions.thumbsUp}
              isActive={isReactionActive?.(id, "thumbsUp")}
              onClick={() => onToggleReaction?.(id, "thumbsUp")}
              ariaLabel={`${reactions.thumbsUp} kciuków w górę`}
            />
          )}

          {/* Separator */}
          <div className="w-px h-4 bg-foreground" aria-hidden="true" />

          {/* Comment Button */}
          <button
            type="button"
            onClick={onToggleInput}
            className="text-foreground hover:text-white transition-colors text-small font-450"
            aria-label="Dodaj komentarz"
          >
            Skomentuj
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-[16px] mt-[16px]">
          {reactions.fire && reactions.fire > 0 && (
            <ReactionButton
              type="fire"
              count={reactions.fire}
              isActive={isReactionActive?.(id, "fire")}
              onClick={() => onToggleReaction?.(id, "fire")}
              ariaLabel={`${reactions.fire} reakcji ogień`}
            />
          )}

          {reactions.heart && reactions.heart > 0 && (
            <ReactionButton
              type="heart"
              count={reactions.heart}
              isActive={isReactionActive?.(id, "heart")}
              onClick={() => onToggleReaction?.(id, "heart")}
              ariaLabel={`${reactions.heart} polubień`}
            />
          )}

          {reactions.lightbulb && reactions.lightbulb > 0 && (
            <ReactionButton
              type="lightbulb"
              count={reactions.lightbulb}
              isActive={isReactionActive?.(id, "lightbulb")}
              onClick={() => onToggleReaction?.(id, "lightbulb")}
              ariaLabel={`${reactions.lightbulb} reakcji żarówka`}
            />
          )}

          {reactions.thumbsUp && reactions.thumbsUp > 0 && (
            <ReactionButton
              type="thumbsUp"
              count={reactions.thumbsUp}
              isActive={isReactionActive?.(id, "thumbsUp")}
              onClick={() => onToggleReaction?.(id, "thumbsUp")}
              ariaLabel={`${reactions.thumbsUp} kciuków w górę`}
            />
          )}
        </div>
      )}

      {!isReply && showInput && (
        <div className="mt-[24px] tbt:mt-[32px] ml-[48px]">
          <CommentInput
            placeholder="Dodaj komentarz..."
            inputName="comment"
            submitAriaLabel="Wyślij komentarz"
          />
        </div>
      )}

      {hasReplies && (
        <div className="ml-[48px]">
          {/* Pierwszy reply - zawsze widoczny */}
          <div className={replies.length === 1 ? "mb-[24px]" : ""}>
            <Comment
              key={replies[0].id}
              {...replies[0]}
              onComment={onComment}
              isReply={true}
              showInput={false}
              onToggleInput={onToggleInput}
              onToggleReaction={onToggleReaction}
              isReactionActive={isReactionActive}
            />
          </div>

          {/* Accordion "Pokaż więcej komentarzy" - tylko jeśli jest więcej niż 1 reply */}
          {replies.length > 1 && (
            <Accordion type="single" collapsible className="">
              <AccordionItem value="more-comments">
                <AccordionContent>
                  <div>
                    {replies.slice(1).map((reply) => (
                      <Comment
                        key={reply.id}
                        {...reply}
                        onComment={onComment}
                        isReply={true}
                        showInput={false}
                        onToggleInput={onToggleInput}
                        onToggleReaction={onToggleReaction}
                        isReactionActive={isReactionActive}
                      />
                    ))}
                  </div>
                </AccordionContent>
                <AccordionTrigger
                  aria-label="Pokaż więcej komentarzy"
                  className="py-[24px] tbt:py-[32px] text-small font-450"
                >
                  Pokaż więcej komentarzy
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      )}
    </div>
  );
}

export { Comment };
export type { CommentProps };
