interface WaveDividerProps {
  className?: string;
}

export default function WaveDivider({ className = "" }: WaveDividerProps) {
  return (
    <div className={`wave-divider ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 240 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,3 C20,0.5 40,5.5 60,3 S100,0.5 120,3 S160,5.5 180,3 S220,0.5 240,3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
