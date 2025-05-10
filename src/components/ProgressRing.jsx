function ProgressRing({ progress, size = 120, strokeWidth = 10, color = "#3B82F6" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className="progress-ring"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* 背景の円 */}
      <circle
        className="progress-ring__circle"
        stroke="#E5E7EB"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      
      {/* 進捗を表す円 */}
      <circle
        className="progress-ring__circle"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      
      {/* 中央のテキスト */}
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize={size / 5}
        fontWeight="bold"
        fill="currentColor"
        className="text-gray-700 dark:text-gray-200"
      >
        {`${Math.round(progress)}%`}
      </text>
    </svg>
  );
}

export default ProgressRing;
