export default function KoffeeLogo({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`flex items-center ${className}`} style={style}>
      <span className="text-inherit leading-none -mr-1.5">K</span>
      <div className="inline-flex flex-col items-center justify-end -mx-1 mt-2 pb-[0.05em]">
        <span
          className="text-[0.40em] leading-none -mb-3.5 text-inherit pr-2"
          style={{ fontFamily: "serif" }}
        >
          今日
        </span>
        <svg
          width="1.8em"
          height="1.8em"
          viewBox="0 0 32 32"
          className="inline-block"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 11C6 10.4477 6.44772 10 7 10H21C21.5523 10 22 10.4477 22 11V15C22 18.3137 19.3137 21 16 21H12C8.68629 21 6 18.3137 6 15V11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M22 13H23C24.1046 13 25 13.8954 25 15C25 16.1046 24.1046 17 23 17H22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse
            cx="14"
            cy="21"
            rx="5"
            ry="1.8"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
      <span className="text-inherit leading-none -ml-2">ffee</span>
    </div>
  );
}
