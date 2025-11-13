import React from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { MoreHorizontal } from "lucide-react";

const ProgressBar = () => {
  const { currentSong, progress } = usePlayer();
  
  return (
    <div className="bg-black/30 rounded-md overflow-hidden">
      <div className=" flex items-center justify-between gap-3">
        <img className="w-10 h-10 m-1.5 rounded object-cover" src={currentSong.cover} alt="" />
        <div className="">
          <p className="font-semibold">{currentSong.title}</p>
          <p className="text-sm">{currentSong.artist}</p>
          
        </div>
        <MoreHorizontal/>
      </div>
      <div className="bg-white/20 h-1 w-full relative">
      <div className="bg-white h-1 absolute top-0 left-0" style={{
        width: `${progress}%`
      }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
