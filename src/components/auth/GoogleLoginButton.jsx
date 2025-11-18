import { cn } from "@utils";

function GoogleLoginButton({ className, disabled, isLoading, ...props }) {
  return (
    <button
      className={cn(
        // Layout & Size
        "flex w-full cursor-pointer items-center justify-center gap-[10px] rounded px-[12px] py-[10px] transition-colors",
        // Font (Roboto Medium)
        "font-['Roboto'] text-[14px] leading-[20px] font-medium",
        // Light Theme (Standard)
        "bg-white text-[#1f1f1f] ring-1 ring-[#747775] ring-inset hover:bg-[#f0f4f8] hover:ring-[#1f1f1f]",
        // Dark Theme
        "dark:bg-[#131314] dark:text-[#e3e3e3] dark:ring-[#8e918f] dark:hover:bg-[#2d2f31] dark:hover:ring-[#e3e3e3]",
        // Focus State
        "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
        // Disabled State
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      disabled={isLoading || disabled}
      type="button"
      {...props}
    >
      <img
        alt="Google logo"
        className="h-[18px] w-[18px]"
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
      />
      <span>
        {isLoading ? "Google 로그인 중..." : "Google 계정으로 로그인"}
      </span>
    </button>
  );
}

export default GoogleLoginButton;
