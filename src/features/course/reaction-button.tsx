import type { ReactionType } from "./use-comments";

type ReactionButtonProps = {
  type: ReactionType;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
  ariaLabel: string;
};

const reactionIcons = {
  fire: (
    <path
      d="M10.2417 3.4756C11.3916 3.98945 12.3304 4.88231 12.9012 6.00503C13.472 7.12775 13.6403 8.41234 13.378 9.6442C13.1156 10.8761 12.4385 11.9806 11.4598 12.7733C10.481 13.566 9.2599 13.9989 8.0004 13.9996C6.92294 13.9997 5.86919 13.6833 4.96999 13.0897C4.07078 12.4961 3.36572 11.6515 2.94236 10.6607C2.519 9.66989 2.39599 8.57656 2.58859 7.51645C2.78119 6.45635 3.28092 5.47616 4.02574 4.6976C4.53868 5.41457 5.21576 5.99839 6.0004 6.40027C6.01414 5.51935 6.22208 4.65232 6.60939 3.86099C6.9967 3.06967 7.55383 2.37355 8.24107 1.82227C8.76557 2.52573 9.45151 3.09277 10.2411 3.4756H10.2417Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  heart: (
    <path
      d="M12.6668 9.33333C13.6602 8.36 14.6668 7.19333 14.6668 5.66667C14.6668 4.69421 14.2805 3.76158 13.5929 3.07394C12.9053 2.38631 11.9726 2 11.0002 2C9.82683 2 9.00016 2.33333 8.00016 3.33333C7.00016 2.33333 6.1735 2 5.00016 2C4.0277 2 3.09507 2.38631 2.40744 3.07394C1.7198 3.76158 1.3335 4.69421 1.3335 5.66667C1.3335 7.2 2.3335 8.36667 3.3335 9.33333L8.00016 14L12.6668 9.33333Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  lightbulb: (
    <path
      d="M10 9.33398C10.1333 8.66732 10.4667 8.20065 11 7.66732C11.6667 7.06732 12 6.20065 12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93913 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 6.00065 4.13333 6.80065 5 7.66732C5.46667 8.13398 5.86667 8.66732 6 9.33398M6 12.0007H10M6.66667 14.6673H9.33333"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  thumbsUp: (
    <>
      <g clipPath="url(#clip0_974_5434)">
        <path
          d="M4.66683 6.66732V14.6673M10.0002 3.92065L9.3335 6.66732H13.2202C13.4272 6.66732 13.6313 6.71551 13.8164 6.80808C14.0016 6.90065 14.1626 7.03506 14.2868 7.20065C14.411 7.36625 14.495 7.55848 14.532 7.76214C14.569 7.96579 14.5581 8.17527 14.5002 8.37398L12.9468 13.7073C12.8661 13.9843 12.6976 14.2276 12.4668 14.4007C12.236 14.5737 11.9553 14.6673 11.6668 14.6673H2.66683C2.31321 14.6673 1.97407 14.5268 1.72402 14.2768C1.47397 14.0267 1.3335 13.6876 1.3335 13.334V8.00065C1.3335 7.64703 1.47397 7.30789 1.72402 7.05784C1.97407 6.80779 2.31321 6.66732 2.66683 6.66732H4.50683C4.75489 6.66719 4.99799 6.59786 5.2088 6.46713C5.41961 6.3364 5.58978 6.14946 5.70016 5.92732L8.00016 1.33398C8.31455 1.33788 8.62399 1.41276 8.90537 1.55305C9.18674 1.69333 9.43278 1.89539 9.6251 2.14412C9.81742 2.39285 9.95104 2.68182 10.016 2.98945C10.0809 3.29708 10.0755 3.61541 10.0002 3.92065Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_974_5434">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </>
  ),
};

function ReactionButton({
  type,
  count,
  isActive = false,
  onClick,
  ariaLabel,
}: ReactionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-[6px] text-foreground hover:text-white transition-colors"
      aria-label={ariaLabel}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill={isActive ? "white" : "none"}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {reactionIcons[type]}
      </svg>
      <span className="text-[13px] font-450 leading-none">{count}</span>
    </button>
  );
}

export { ReactionButton };
export type { ReactionButtonProps };
