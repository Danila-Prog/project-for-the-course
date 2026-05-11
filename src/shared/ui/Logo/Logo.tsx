import clsx from "clsx";

export const Logo = ({
  className,
  viewBreakpointText,
}: {
  className?: string;
  viewBreakpointText?: string;
}) => {
  return (
    <div className={clsx("flex items-center gap-3 select-none", className)}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="min-[1750px]:w-[48px] min-[1750px]:h-[48px]"
      >
        <circle cx="18" cy="18" r="16" stroke="#60dcc9" strokeWidth="2" />
        <path
          d="M10 26 L18 10 L26 26"
          stroke="#60dcc9"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="10" cy="26" r="1.5" fill="#60dcc9" />
        <circle cx="18" cy="10" r="1.5" fill="#60dcc9" />
        <circle cx="26" cy="26" r="1.5" fill="#60dcc9" />
      </svg>

      <span
        className={clsx(
          viewBreakpointText,
          "text-lg md:text-xl min-[1750px]:text-2xl font-bold tracking-tight text-accent-black",
        )}
      >
        Маршрути
        <span className="text-accent-green">затор</span>
      </span>
    </div>
  );
};
