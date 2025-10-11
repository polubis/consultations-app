import { useState } from "react";
import type { CommentProps } from "./comment";

type ReactionType = "fire" | "heart" | "lightbulb" | "thumbsUp";

type ActiveReactions = {
  [commentId: string]: {
    [key in ReactionType]?: boolean;
  };
};

const mockComments: CommentProps[] = [
  {
    id: "1",
    rating: "9/10",
    content:
      "Mentoring przerósł moje oczekiwania! Zaczynałem od zera, a teraz pracuję jako junior frontend developer. Mentor w przystępny sposób tłumaczył nawet najtrudniejsze zagadnienia, a do tego miał ogromną cierpliwość. Dzięki jego wsparciu nie tylko nauczyłam się programować, ale też uwierzyłam w siebie!",
    author: {
      name: "Anna",
      avatar: "/adrian-284.webp",
      fallback: "A",
    },
    reactions: {
      fire: 2,
      heart: 19,
      lightbulb: 4,
      thumbsUp: 4,
    },
    replies: [
      {
        id: "1-1",
        content: "Zgadzam się!",
        author: {
          name: "Tomek",
          avatar: "/adrian-284.webp",
          fallback: "T",
        },
        reactions: {
          fire: 2,
          heart: 19,
          lightbulb: 4,
          thumbsUp: 4,
        },
      },
      {
        id: "1-2",
        content: "Bardzo pomocna opinia, dziękuję za podzielenie się!",
        author: {
          name: "Kasia",
          avatar: "/adrian-284.webp",
          fallback: "K",
        },
        reactions: {
          fire: 1,
          heart: 5,
          lightbulb: 2,
          thumbsUp: 3,
        },
      },
      {
        id: "1-3",
        content: "Też rozważam rozpoczęcie mentoringu po przeczytaniu tego!",
        author: {
          name: "Michał",
          avatar: "/adrian-284.webp",
          fallback: "M",
        },
        reactions: {
          heart: 8,
          thumbsUp: 6,
        },
      },
    ],
  },
  {
    id: "2",
    rating: "10/10",
    content:
      "Najlepsza inwestycja w moją karierę! Po 3 miesiącach mentoringu dostałem awans na mid-level developera. Mentor nie tylko uczył technologii, ale także pokazał jak myśleć jak senior developer i podchodzić do problemów strategicznie.",
    author: {
      name: "Paweł",
      avatar: "/adrian-284.webp",
      fallback: "P",
    },
    reactions: {
      fire: 5,
      heart: 24,
      lightbulb: 8,
      thumbsUp: 12,
    },
    replies: [
      {
        id: "2-1",
        content: "Gratuluję awansu! Motywujesz mnie do działania!",
        author: {
          name: "Ola",
          avatar: "/adrian-284.webp",
          fallback: "O",
        },
        reactions: {
          heart: 6,
          thumbsUp: 4,
        },
      },
    ],
  },
];

function useComments() {
  const [comments, setComments] = useState<CommentProps[]>(mockComments);
  const [openInputs, setOpenInputs] = useState<Record<string, boolean>>({});
  const [activeReactions, setActiveReactions] = useState<ActiveReactions>({});

  const toggleInput = (commentId: string) => {
    setOpenInputs((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const closeInput = (commentId: string) => {
    setOpenInputs((prev) => ({
      ...prev,
      [commentId]: false,
    }));
  };

  const isInputOpen = (commentId: string): boolean => {
    return openInputs[commentId] || false;
  };

  const addComment = (parentId: string, content: string) => {
    const newReply: CommentProps = {
      id: `${parentId}-${Date.now()}`,
      content,
      author: {
        name: "Użytkownik",
        avatar: "/adrian-284.webp",
        fallback: "U",
      },
      reactions: {},
    };

    setComments((prevComments) => {
      const addReplyToComment = (comments: CommentProps[]): CommentProps[] => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies),
            };
          }
          return comment;
        });
      };

      return addReplyToComment(prevComments);
    });

    closeInput(parentId);
  };

  const addNewComment = (content: string, rating?: string) => {
    const newComment: CommentProps = {
      id: `new-${Date.now()}`,
      content,
      rating,
      author: {
        name: "Użytkownik",
        avatar: "/adrian-284.webp",
        fallback: "U",
      },
      reactions: {},
      replies: [],
    };

    setComments((prevComments) => [...prevComments, newComment]);
  };

  const toggleReaction = (commentId: string, reactionType: ReactionType) => {
    const isActive = activeReactions[commentId]?.[reactionType] || false;

    setActiveReactions((prev) => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        [reactionType]: !isActive,
      },
    }));

    setComments((prevComments) => {
      const updateReaction = (comments: CommentProps[]): CommentProps[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            const currentCount = comment.reactions[reactionType] || 0;
            return {
              ...comment,
              reactions: {
                ...comment.reactions,
                [reactionType]: isActive
                  ? Math.max(0, currentCount - 1)
                  : currentCount + 1,
              },
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateReaction(comment.replies),
            };
          }
          return comment;
        });
      };

      return updateReaction(prevComments);
    });
  };

  const isReactionActive = (
    commentId: string,
    reactionType: ReactionType,
  ): boolean => {
    return activeReactions[commentId]?.[reactionType] || false;
  };

  return {
    comments,
    toggleInput,
    closeInput,
    isInputOpen,
    addComment,
    addNewComment,
    toggleReaction,
    isReactionActive,
  };
}

export { useComments };
export type { ReactionType };
