import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const words = ["CREATE", "ANIMATE", "INSPIRE"];

const AnimatedWord: React.FC<{ text: string; color: string }> = ({
  text,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleIn = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const y = interpolate(frame, [0, 15], [80, 0], {
    extrapolateRight: "clamp",
  });

  const scaleOut = interpolate(frame, [35, 50], [1, 0.6], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const opacityOut = interpolate(frame, [35, 50], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: opacity * opacityOut,
      }}
    >
      <span
        style={{
          fontSize: 160,
          fontWeight: 900,
          fontFamily: "Arial Black, Arial, sans-serif",
          color,
          transform: `scale(${scaleIn * scaleOut}) translateY(${y}px)`,
          letterSpacing: 12,
          textShadow: `0 4px 30px ${color}66`,
        }}
      >
        {text}
      </span>
    </AbsoluteFill>
  );
};

const LetterByLetter: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
      }}
    >
      {text.split("").map((letter, i) => {
        const delay = i * 3;
        const s = spring({
          frame: frame - delay,
          fps,
          config: { damping: 10, stiffness: 180 },
        });

        const rotate = interpolate(s, [0, 1], [-90, 0]);
        const opacity = interpolate(frame - delay, [0, 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={i}
            style={{
              fontSize: 120,
              fontWeight: 900,
              fontFamily: "Arial Black, Arial, sans-serif",
              color: "#fff",
              display: "inline-block",
              transform: `scale(${s}) rotate(${rotate}deg)`,
              opacity,
              letterSpacing: 8,
            }}
          >
            {letter}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

export const KineticTypo: React.FC = () => {
  const frame = useCurrentFrame();

  const bgProgress = interpolate(frame, [0, 60, 120, 180], [0, 1, 2, 3]);

  const r = interpolate(bgProgress, [0, 1, 2, 3], [15, 20, 10, 30]);
  const g = interpolate(bgProgress, [0, 1, 2, 3], [15, 10, 15, 15]);
  const b = interpolate(bgProgress, [0, 1, 2, 3], [30, 35, 30, 20]);
  const bg = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D"];

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      {/* Animated words: CREATE, ANIMATE, INSPIRE */}
      {words.map((word, i) => (
        <Sequence key={word} from={i * 50} durationInFrames={55}>
          <AnimatedWord text={word} color={colors[i]} />
        </Sequence>
      ))}

      {/* Final letter-by-letter reveal */}
      <Sequence from={150} durationInFrames={30}>
        <LetterByLetter text="REMOTION" />
      </Sequence>
    </AbsoluteFill>
  );
};
