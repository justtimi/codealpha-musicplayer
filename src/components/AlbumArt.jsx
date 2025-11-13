import React, { useContext } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import { motion } from "framer-motion";

const AlbumArt = () => {
  const { playlist, currentIndex } = usePlayer();

  return (
    <div className="relative  flex justify-center items-center h-[300px] perspective-[1000px] ">
      {playlist.map((song, index) => {
        const offset = index - currentIndex;
        const isActive = index === currentIndex;

        return (
          <div
            key={index}
            className={`carousel-item absolute transition-all duration-500 ease-in-out ${
              isActive ? "z-20 scale-110" : "z-10 opacity-70"
            }`}
            style={{
              transform: `rotateY(${offset * 30}deg)  translateX(${
                offset * 150
              }px) translateZ(${isActive ? 100 : 0}px)`,
            }}
          >
            <div className="w-60   bg-white/5 backdrop-blur-lg shadow-lg flex flex-col items-center justify-center p-3 rounded-3xl">
              <img
                className="h-54 w-full rounded-2xl  object-cover m-4"
                src={song.cover}
                alt={song.title}
              />
              {isActive && (
                <div className="text-center mt-2">
                  <h3 className="font-semibold text-2xl">{song.title}</h3>
                  <p className="text-sm opacity-70">{song.artist}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumArt;
