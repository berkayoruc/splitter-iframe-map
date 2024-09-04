import { useEffect, useState } from "react";
import GameEngine from "./GameEngine";

function App() {
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
  const [isMobile, setIsMobile] = useState(
    window.innerHeight <= 540 || window.innerWidth <= 540
  );

  const handleRotateDevice = (event) => {
    setIsPortrait(event.matches);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 540 || window.innerHeight <= 540);
  };

  useEffect(() => {
    window
      .matchMedia("(orientation: portrait)")
      .addEventListener("change", handleRotateDevice);
    window.addEventListener("resize", handleResize);
    return () => {
      window
        .matchMedia("(orientation: portrait)")
        .removeEventListener("change", handleRotateDevice);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <GameEngine isMobile={isMobile} isPortrait={isPortrait} />;
}

export default App;
