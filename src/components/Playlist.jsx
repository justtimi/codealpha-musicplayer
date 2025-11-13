import React from 'react'
import { usePlayer } from '../contexts/PlayerContext'

const Playlist = () => {
  const { playlist, currentIndex, setCurrentIndex} = usePlayer()
  return (
    <div>
      {playlist.map((song, index) => (
  <div
    key={song.id}
    onClick={() => setCurrentIndex(index)}
    className={`p-2 rounded-md cursor-pointer ${
      index === currentIndex ? "bg-blue-600" : "hover:bg-gray-700"
    }`}
  >
    {song.title} - {song.artist}
  </div>
))}

    </div>
  )
}

export default Playlist