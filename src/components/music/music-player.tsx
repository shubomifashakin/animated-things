import { useDeferredValue, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";

import { Pause, Play } from "lucide-react";

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format seconds to always show 2 digits (e.g., "05" instead of "5")
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${formattedSeconds}`;
}

export default function MusicPlayer() {
  const [playTime, setPlayTimeValue] = useState(124);

  const [playState, setPlayState] = useState(false);
  const [hasLastPlayed, setLastPlayed] = useState(false);

  const [ref, { height }] = useMeasure({ debounce: 0 });
  const [ref2, { height: height2 }] = useMeasure({ debounce: 0 });

  const deferredHeight = useDeferredValue(height);

  function handlePlayState() {
    setPlayState((prev) => !prev);
    setLastPlayed((prev) => !prev);
  }

  return (
    <div
      className={`${
        playState ? "bg-auburn" : "bg-black"
      } text-white rounded-lg p-2.5 border border-stone-500 w-[250px] max-w-[250px]`}
    >
      <MotionConfig transition={{ type: "spring", bounce: 0.5 }}>
        <div>
          <AnimatePresence>
            <motion.div
              key={"image-container"}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              animate={{ height: height ? height : deferredHeight, opacity: 1 }}
              className={`w-full relative overflow-hidden rounded-md ${
                playState ? "mb-2" : ""
              }`}
            >
              <div ref={ref}>
                {playState && (
                  <motion.img
                    loading="lazy"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="object-cover h-[200px] w-full"
                    src={
                      "https://i.scdn.co/image/ab67616d0000b273d564b78261aa00798e23d66d"
                    }
                    alt="album-cover"
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              key={"controls-container"}
              animate={{ opacity: 1, height: height2 ? height2 : undefined }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div ref={ref2} className="space-y-2">
                <div className="flex justify-between  gap-x-2 items-center">
                  <button onClick={handlePlayState}>
                    {playState ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <span className="w-full flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.01}
                      id="play-time"
                      className="transition-colors duration-150 ease-linear"
                    />
                  </span>

                  <span className="text-white text-sm">
                    {formatTime(playTime)}
                  </span>
                </div>

                {hasLastPlayed && (
                  <div className="space-y-1 overflow-hidden">
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="ellipsis animate-text-slider capitalize flex justify-left items-center gap-x-1 whitespace-nowrap"
                    >
                      <span>Watching movies with the sound off</span>
                      <span>Watching movies with the sound off</span>
                    </motion.h1>

                    <motion.p
                      className="text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                    >
                      Mac Miller
                    </motion.p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </MotionConfig>
    </div>
  );
}
