import React from "react";
import Header from "./components/Header.jsx";
import AlbumArt from "./components/AlbumArt.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import PlayerControls from "./components/PlayerControls.jsx";
import Playlist from "./components/Playlist.jsx";
import { usePlayer } from "./contexts/PlayerContext.jsx";
import { Volume2 } from "lucide-react";

const App = () => {
  const { currentSong } = usePlayer();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {currentSong && (
        <div
          className="absolute inset-0 bg-center bg-cover blur-3xl scale-110 brightness-75 transition-all duration-700"
          style={{ backgroundImage: `url(${currentSong.cover})` }}
        ></div>
      )}

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center  text-white p-6">
        <Header />
        <div className="w-full">
          <AlbumArt />
          <div className="flex justify-between items-center gap-4 bg-white/5 py-2 px-8 rounded-full border border-b-0 border-white/50 w-full">
            <PlayerControls />
            <ProgressBar />
            <Volume2/>
          </div>

          <Playlist />
        </div>
      </div>
    </div>
  );
};

export default App;
