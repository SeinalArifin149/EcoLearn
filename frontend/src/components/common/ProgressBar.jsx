export default function ProgressBar({ value = 0, max = 100, label }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className="progress-container">
      {label && (
        <div className="progress-labels">
          <span>{label}</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
