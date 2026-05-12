import { Composition } from "remotion";
import { KineticTypo } from "./KineticTypo";

export const Root: React.FC = () => {
  return (
    <Composition
      id="KineticTypo"
      component={KineticTypo}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
