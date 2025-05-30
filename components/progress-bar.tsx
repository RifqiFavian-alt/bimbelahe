// components/ProgressBar.tsx
type ProgressBarProps = {
  current: number;
  total: number;
};

function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full bg-[#D9D9D9] rounded-full h-3 overflow-hidden">
      <div className="h-full bg-[#7E60BF] transition-all duration-500 ease-in-out" style={{ width: `${percentage}%` }} />
    </div>
  );
}

export { ProgressBar };
