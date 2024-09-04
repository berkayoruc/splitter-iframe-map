import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import ReactSplit, { SplitDirection } from "@devbookhq/splitter";
import { useEffect, useReducer, useState } from "react";

export default function GameEngineMobile({ isPortrait }) {
  const [mapState, setMapState] = useState(null);

  const reducer = (state, action) => {
    switch (action.type) {
      case "RESIZE_STARTED":
        return { ...state, isDragging: true };
      case "RESIZE_FINISHED":
        return { ...state, sizes: action.sizes, isDragging: false };
      default:
        throw Error("asaaaaaa");
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isDragging: false,
    sizes: [50, 50],
  });

  useEffect(() => {
    console.log(mapState)
    if (mapState) return;
    setTimeout(() => {
      const map = new maplibregl.Map({
        container: "istbul-game-engine-map",
        style: "https://demotiles.maplibre.org/style.json", // style URL
        center: [29, 41],
        zoom: 9,
      });
      console.log(map)
      map.on("load", function () {
        setMapState(map);
      });
    }, 200);
  }, []);

  return (
    <ReactSplit
      direction={
        isPortrait ? SplitDirection.Vertical : SplitDirection.Horizontal
      }
      onResizeStarted={(_) => dispatch({ type: "RESIZE_STARTED" })}
      onResizeFinished={(_, allSizes) =>
        dispatch({ type: "RESIZE_FINISHED", sizes: [...allSizes] })
      }
      initialSizes={state.sizes}
    >
      <div id="panorama-container" className="bg-blue-300 w-full h-full">
        <iframe
          id="panorama-iframe"
          className=""
          title="panorama"
          style={{
            pointerEvents: state.isDragging ? "none" : "unset",
            height: "100%",
            width: "100%",
          }}
          src=""
        ></iframe>
        <button id="panorama-close-button" hidden></button>
      </div>
      <div className="w-full h-full">
        <div
          id="istbul-game-engine-map"
          className="relative bg-green-300 w-full h-full"
        >
          <button
            className={`px-4 py-3 bg-[#2b7578] z-10 rounded-lg backdrop-blur-sm justify-center items-center absolute bottom-4 text-[#fefefe] text-[32px] font-bold font-inter tracking-widest left-1/2 -translate-x-1/2`}
          >
            {"İşaretlemeyi Bitir"}
          </button>
        </div>
      </div>
    </ReactSplit>
  );
}
