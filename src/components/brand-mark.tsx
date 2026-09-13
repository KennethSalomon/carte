export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block h-6 w-6 shrink-0 ${className}`}
    >
      {[0, 45, 90, 135].map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-current"
          style={{ transform: `translate(-50%,-50%) rotate(${deg}deg)` }}
        />
      ))}
    </span>
  );
}
