import ImageToggle from "./components/imageToggle/image-toggle";
import MusicPlayer from "./components/music/music-player";

export default function App() {
  return (
    <div className="h-dvh w-full bg-black flex items-center justify-center gap-x-4 p-4">
      <ImageToggle imageSrc={"imageSrc"} />

      <MusicPlayer />

      <ImageToggle imageSrc={"imageSrc"} />
    </div>
  );
}
