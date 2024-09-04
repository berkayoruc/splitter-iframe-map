import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import ReactSplit from "@devbookhq/splitter";
import { useEffect, useReducer, useState } from "react";

export default function GameEngineDesktop() {
  const [mapState, setMapState] = useState(null);

  const reducer = (state, action) => {
    switch (action.type) {
      case "RESIZE_STARTED":
        return { ...state, isDragging: true };
      case "RESIZE_FINISHED":
        return { ...state, sizes: action.sizes, isDragging: false };
      case "ACTIVATE_SPLITE_VIEW":
        return { ...state, sizes: [50, 50], isSplitView: true };
      case "DEACTIVATE_SPLITE_VIEW":
        return { ...state, sizes: [100], isSplitView: false };
      default:
        throw Error("asaaaaaa");
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isDragging: false,
    sizes: [100],
    isSplitView: false,
  });

  useEffect(() => {
    console.log(mapState);
    if (!state.isSplitView) return;
    setTimeout(() => {
      const map = new maplibregl.Map({
        container: "istbul-game-engine-map",
        style: "https://demotiles.maplibre.org/style.json", // style URL
        center: [29, 41],
        zoom: 9,
      });
      console.log(map);
      map.on("load", function () {
        setMapState(map);
      });
    }, 300);
  }, [state.isSplitView]);

  return (
    <ReactSplit
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
            height: "100%",
            width: "100%",
            pointerEvents: state.isDragging ? "none" : "unset",
          }}
          src=""
        ></iframe>
        <button
          id="panorama-close-button"
          className="absolute top-0 left-0"
          style={{ pointerEvents: state.isDragging ? "none" : "unset" }}
          onClick={() => dispatch({ type: "ACTIVATE_SPLITE_VIEW" })}
        >
          aaaaa
        </button>
      </div>

      {state.isSplitView && (
        <div className="w-full h-full">
          <div
            id="istbul-game-engine-map"
            className="relative bg-green-300 w-full h-full"
          >
            <button
              onClick={() => dispatch({ type: "DEACTIVATE_SPLITE_VIEW" })}
              className={`px-4 py-3 bg-[#2b7578] z-10 rounded-lg backdrop-blur-sm justify-center items-center absolute bottom-4 text-[#fefefe] text-[32px] font-bold font-inter tracking-widest left-1/2 -translate-x-1/2`}
            >
              {"İşaretlemeyi Bitir"}
            </button>
          </div>
        </div>
      )}
    </ReactSplit>
  );
}
