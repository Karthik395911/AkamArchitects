import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  images: GalleryImage[];
  columns?: 2 | 3;
}

export default function Lightbox({ images, columns = 3 }: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, showPrev, showNext]);

  return (
    <>
      <div
        className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
      >
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-sm bg-mist focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label={`Open image ${index + 1} of ${images.length}: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent hover:text-accent"
            >
              &#10005;
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent hover:text-accent md:left-6"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent hover:text-accent md:right-6"
                >
                  &#8594;
                </button>
              </>
            )}

            <motion.img
              key={images[activeIndex].src}
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full max-w-full rounded-sm object-contain"
            />

            <p className="absolute bottom-6 left-1/2 w-full max-w-lg -translate-x-1/2 text-center text-sm text-paper/70">
              {images[activeIndex].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
