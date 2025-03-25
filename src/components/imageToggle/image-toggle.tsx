import { useDeferredValue, useState } from "react";

import useMeasure from "react-use-measure";

import { AnimatePresence, motion } from "motion/react";

export default function ImageToggle({
  imageSrc,
  btnText = "View Image",
}: {
  imageSrc: string;
  btnText?: string;
}) {
  const [ref, bounds] = useMeasure({ debounce: 0 });
  const [ref2, bounds2] = useMeasure({ debounce: 0 });

  const deferredHeight = useDeferredValue(bounds2.height);

  const [imageShown, setImageShown] = useState(false);

  function handleShowImage() {
    setImageShown(!imageShown);
  }

  return (
    <motion.div
      animate={{
        height: bounds.height ? bounds.height : undefined,
      }}
      className="rounded-lg border border-stone-500 bg-black text-white overflow-hidden"
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <div ref={ref} className="relative rounded-lg p-2">
        <AnimatePresence mode="sync">
          {!imageShown && (
            <motion.div
              animate={{
                opacity: 1,
                transition: { delay: 0.35 },
              }}
              exit={{ opacity: 0, pointerEvents: "none" }}
              key={"btn-container"}
              initial={{ opacity: 0 }}
            >
              <button
                title="View Image"
                className="text-center flex items-center w-full text-sm hover:text-gray-600 transition-colors duration-300 ease-linear"
                onClick={handleShowImage}
              >
                {btnText}
              </button>
            </motion.div>
          )}

          <motion.div
            animate={{
              opacity: 1,
              height: bounds2.height ? bounds2.height : deferredHeight,
            }}
            key={"image-container"}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-sm overflow-hidden"
          >
            <div ref={ref2} className="overflow-hidden">
              {imageShown && (
                <motion.img
                  src={
                    imageSrc &&
                    "https://images.pexels.com/photos/31236816/pexels-photo-31236816/free-photo-of-charming-kyoto-bookstore-street-scene-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt="image1"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { delay: 0.5 },
                  }}
                  className="object-cover size-32 cursor-pointer"
                  onClick={handleShowImage}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
