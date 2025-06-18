function WaveDivider({ fill = "#052e20", flip = false }) {
  return (
    <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg
        className="w-full -mb-1"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,32C1200,21,1320,11,1380,5.3L1440,0L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
