import GameEngineMobile from "./mobile";
import GameEngineDesktop from "./desktop";

export default function GameEngine({ isMobile, isPortrait }) {
  return (
    <div className="h-svh w-svw">
      {isMobile ? (
        <GameEngineMobile isPortrait={isPortrait} />
      ) : (
        <GameEngineDesktop />
      )}
    </div>
  );
}
