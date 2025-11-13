# 🎵 React Music Player

This was a project I took on during my **CodeAlpha internship** to demonstrate my skills in frontend development. It was a really fun project, but it pushed me to learn a lot because it wasn't something I could just do ordinarily.

---

## ✨ Features

- ▶️ **Play, Pause & Skip** - Full playback controls
- 🎵 **Playlist Support** - Click any song to play it
- � **Volume Control** - Adjust volume with dynamic icons
- 🎨 **Dynamic Backgrounds** - Album covers change based on the current song
- 🎠 **3D Music Carousel** - Rotating visual element
- 🎨 **Glassmorphic UI** - Modern, sleek design with smooth animations

---

## 🚀 Tech Stack

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| **React 19**          | UI framework                 |
| **Vite**              | Fast build tool & dev server |
| **Tailwind CSS**      | Utility-first styling        |
| **React Context API** | State management             |
| **Framer Motion**     | Smooth animations            |
| **Lucide Icons**      | Beautiful icon library       |

---

## 🎧 Project Overview

The goal of the project was to build a music player that could:

- Play, pause, skip forward, and go back a song
- Have a playlist you can play songs from by clicking on them
- Control volume
- Display music covers as dynamic backgrounds that change depending on the song playing
- Include a 3D music carousel that rotates

---

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── AlbumArt.jsx    # Album cover display
│   ├── Header.jsx      # Player header
│   ├── PlayerControls.jsx   # Play, pause, skip buttons
│   ├── Playlist.jsx    # Song list
│   └── ProgressBar.jsx # Song progress display
├── contexts/           # React Context for state management
│   └── PlayerContext.jsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── data/               # Sample song data
└── App.jsx             # Main component
```

### Key Files

| File                 | Purpose                    | Link                                                                       |
| -------------------- | -------------------------- | -------------------------------------------------------------------------- |
| `PlayerContext.jsx`  | Main state management hook | [`src/contexts/PlayerContext.jsx`](./src/contexts/PlayerContext.jsx)       |
| `PlayerControls.jsx` | Play/pause/skip buttons    | [`src/components/PlayerControls.jsx`](./src/components/PlayerControls.jsx) |
| `ProgressBar.jsx`    | Song progress display      | [`src/components/ProgressBar.jsx`](./src/components/ProgressBar.jsx)       |
| `App.jsx`            | Main app component         | [`src/App.jsx`](./src/App.jsx)                                             |

---

## What I Learned

This project really made me step out of my comfort zone. Here are the main things I learned:

### React Context API

I used React Context because **prop drilling** was going to get messy with the hierarchy of my components. Here’s how I handled it:

- Created state variables in the context file
- Defined helper functions that use those state variables
- Exported everything from the context file
- Added a **custom hook** to use the context easily
- Wrapped the app in a **Provider** in `main.jsx` so all files could share the context
- Imported the custom hook into other files to use the states and functions

**Example usage:**

```jsx
// In a component
import { usePlayer } from "../contexts/PlayerContext";

function PlayerControls() {
  const { isPlaying, play, pause } = usePlayer();
  return (
    <button onClick={isPlaying ? pause : play}>{isPlaying ? "⏸" : "▶"}</button>
  );
}
```

**More detailed example** ([`PlayerControls.jsx`](./src/components/PlayerControls.jsx)):

```jsx
import React from "react";
import { Play, Pause, Rewind, FastForward } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";

const PlayerControls = () => {
  const { isPlaying, togglePlayPause, next, prev } = usePlayer();

  return (
    <div className="gap-3 flex">
      <button onClick={prev}>
        <Rewind fill="white" />
      </button>
      <button onClick={togglePlayPause}>
        {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
      </button>
      <button onClick={next}>
        <FastForward fill="white" />
      </button>
    </div>
  );
};

export default PlayerControls;
```

**View the full context setup** ([`PlayerContext.jsx`](./src/contexts/PlayerContext.jsx))

### useRef Hook

I learned that `useRef` can be used to control other elements — which I used for controlling the `<audio>` element. This allows direct DOM manipulation without triggering re-renders.

**Example from PlayerContext.jsx:**

```jsx
const audioRef = useRef(new Audio());

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

const changeVolume = (value) => {
  audioRef.current.volume = value; // Direct DOM manipulation
  setVolume(value);
};
```

### Conditional Rendering & UI

- Practiced conditional rendering with **ternary operators** and the **logical && operator**
- Example: I decided not to show the title and artist of a song unless `isPlaying` is true
- Volume icons change dynamically depending on the volume level
- Learned about **inset** in Tailwind CSS for precise positioning

**Example from ProgressBar.jsx** ([view file](./src/components/ProgressBar.jsx)):

```jsx
const ProgressBar = () => {
  const { currentSong, progress } = usePlayer();

  return (
    <div className="bg-black/30 rounded-md overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <img
          className="w-10 h-10 m-1.5 rounded object-cover"
          src={currentSong.cover}
          alt=""
        />
        <div>
          {/* Conditional rendering - show song info */}
          {currentSong && (
            <>
              <p className="font-semibold">{currentSong.title}</p>
              <p className="text-sm">{currentSong.artist}</p>
            </>
          )}
        </div>
      </div>
      {/* Dynamic progress bar width */}
      <div className="bg-white/20 h-1 w-full relative">
        <div
          className="bg-white h-1 absolute top-0 left-0"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
```

### Design & Motion

- Explored **Glassmorphic UI** for a modern, translucent look
- Added animations using **Framer Motion** for smooth, delightful interactions
- Implemented responsive design with Tailwind CSS

**App.jsx** - Glassmorphic design with dynamic background ([view full file](./src/App.jsx)):

```jsx
const App = () => {
  const { currentSong } = usePlayer();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Dynamic blurred background that changes with song */}
      {currentSong && (
        <div
          className="absolute inset-0 bg-center bg-cover blur-3xl scale-110 brightness-75 transition-all duration-700"
          style={{ backgroundImage: `url(${currentSong.cover})` }}
        ></div>
      )}

      {/* Dark overlay for glassmorphic effect */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main UI content with glassmorphic container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white p-6">
        <Header />
        <div className="w-full">
          <AlbumArt />
          {/* Glassmorphic player bar */}
          <div className="flex justify-between items-center gap-4 bg-white/5 py-2 px-8 rounded-full border border-b-0 border-white/50 w-full">
            <PlayerControls />
            <ProgressBar />
          </div>
          <Playlist />
        </div>
      </div>
    </div>
  );
};
```

---

## 💻 Code Examples & Patterns

### Quick Links to Source Files

- **State Management**: [`PlayerContext.jsx`](./src/contexts/PlayerContext.jsx) - Custom React Context with usePlayer hook
- **Player Controls**: [`PlayerControls.jsx`](./src/components/PlayerControls.jsx) - Play/pause/skip button logic
- **Progress Display**: [`ProgressBar.jsx`](./src/components/ProgressBar.jsx) - Song progress and metadata
- **Main Layout**: [`App.jsx`](./src/App.jsx) - Component composition and styling
- **Song Data**: [`data.js`](./src/data/data.js) - Sample playlist data structure

### Common Patterns Used

1. **Custom Hook Pattern** - `usePlayer()` hook for accessing context
2. **Controlled Component Pattern** - Audio element controlled via useRef
3. **Conditional Rendering** - Ternary operators for dynamic UI
4. **Dynamic Styling** - Inline styles with state variables for animations
5. **Component Composition** - Modular components combined in App.jsx

---

## 🛠️ Setup & Installation

If you want to try it out locally, here's how:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repo:**

   ```bash
   git clone https://github.com/justtimi/codealpha-musicplayer.git
   ```

2. **Navigate to the project folder:**

   ```bash
   cd music-player
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173` and enjoy! 🎵

### Build for Production

```bash
npm run build
```

---

## How to Use

- **Play/Pause**: Click the play button to start or pause the current song
- **Skip Songs**: Use the next and previous buttons to navigate through songs
- **Select from Playlist**: Click any song in the playlist to play it
- **Adjust Volume**: Use the volume slider to control playback volume
- **View Album Art**: The background dynamically updates with the album cover

---

## 🔧 Troubleshooting

| Issue                    | Solution                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Port 5173 already in use | Change the port in `vite.config.js` or kill the process using that port              |
| `node_modules` missing   | Run `npm install` again                                                              |
| Audio not playing        | Check browser console for errors, ensure audio files exist in `public/assets/songs/` |
| Styles not loading       | Clear browser cache and hard refresh (Ctrl+Shift+R)                                  |

---

## 📦 Dependencies

See `package.json` for the complete list of dependencies and versions.

---

## Summary

Overall, this was a really fun and challenging project. I got better at React Context, hooks, conditional rendering, and UI design. I now feel confident building interactive and dynamic front-end apps from scratch. This experience has strengthened my understanding of modern React patterns and state management!

---

## 📝 License

This project is open source. Feel free to use it as a learning resource.

---

**Made during CodeAlpha Internship** 🚀
