import React from "react";
import { Play, Pause, Rewind, FastForward } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";

const PlayerControls = () => {
  const { isPlaying, togglePlayPause, next, prev } = usePlayer();
  return (
    <div className="gap-3 flex">
      <button onClick={prev}><Rewind fill="white"/></button>
      <button onClick={togglePlayPause}>
        {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
      </button>
      <button onClick={next}><FastForward fill="white"/></button>
    </div>
  );
};

export default PlayerControls;
