import clsx from "clsx";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex items-center gap-3 select-none", className)}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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

      <span className="text-xl font-bold tracking-tight text-accent-black">
        Маршрути
        <span className="text-accent-green">затор</span>
      </span>
    </div>
  );
};
