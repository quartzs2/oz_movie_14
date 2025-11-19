import { KakaoLogo } from "@assets";
import { cn } from "@utils";

function KakaoLoginButton({ className, disabled, isLoading, ...props }) {
  return (
    <button
      className={cn(
        // Layout & Size
        "flex w-full cursor-pointer items-center justify-center gap-[10px] rounded px-[12px] py-[10px] transition-colors",
        // Font
        "text-[14px] leading-[20px] font-medium",
        // Kakao Theme (Official Brand Color)
        "bg-[#FEE500] text-[#000000] hover:bg-[#FDD835]",
        // Dark Theme
        "dark:bg-[#FEE500] dark:text-[#000000] dark:hover:bg-[#FDD835]",
        // Focus State
        "focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none",
        // Disabled State
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      disabled={isLoading || disabled}
      type="button"
      {...props}
    >
      <KakaoLogo className="h-[18px] w-[18px]" />
      <span>
        {isLoading ? "카카오 로그인 중..." : "카카오 계정으로 로그인"}
      </span>
    </button>
  );
}

export default KakaoLoginButton;
