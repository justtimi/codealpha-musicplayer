import { createContext, useState, useEffect, useRef, useContext } from "react";

import songs from "../data/data.js";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(songs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio());

  const currentSong = playlist[currentIndex];

  const play = () => {
    if (currentSong) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const next = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const prev = () => {
    if (playlist.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (playlist.length > 0 && currentSong?.src) {
      audio.src = currentSong?.src;
      if (isPlaying) audio.play();
    }
  }, [currentIndex, playlist]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => next();
    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, [playlist]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      audio.addEventListener("timeupdate", updateProgress)
      
      return () => audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        setPlaylist,
        currentSong,
        isPlaying,
        setIsPlaying,
        play,
        pause,
        next,
        prev,
        volume,
        setVolume,
        progress,
        setProgress,
        changeVolume,
        togglePlayPause,
        setCurrentIndex,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
