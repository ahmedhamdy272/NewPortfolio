import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants/index.d";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const Projects = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  const [preview, setPreview] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentProject = myProjects[currentIndex];

  const nextProject = () => {
    if (currentIndex < myProjects.length - 1) {
      setDirection(1);
      setCurrentIndex((prev: number) => prev + 1);
    }
  };

  const previousProject = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev: number) => prev - 1);
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      zIndex: 1,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      x: 0,
      zIndex: 2,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      zIndex: 1,
    }),
  };

  const pageTransition = {
    duration: 0.8,
    ease: [0.4, 0.0, 0.2, 1],
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
      id="work"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
      {/* Book Page Container */}
      <div className="flex justify-center items-center my-16 min-h-[600px] perspective-1000">
        <div className="relative w-full max-w-6xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transformOrigin: "left center",
              }}
            >
              {/* Book Page Wrapper with paper effect */}
              <div
                className="relative w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-lg shadow-2xl overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), inset 0 0 100px rgba(255, 255, 255, 0.02), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  minHeight: "600px",
                }}
              >
                {/* Paper texture effect - more prominent */}
                <div
                  className="absolute inset-0 rounded-lg opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='paper' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='100' cy='100' r='1' fill='%23ffffff' opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='0.5' fill='%23ffffff' opacity='0.05'/%3E%3Ccircle cx='150' cy='150' r='0.5' fill='%23ffffff' opacity='0.05'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23paper)'/%3E%3C/svg%3E")`,
                  }}
                />
                
                {/* Book binding/crease line on the left - more prominent */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/60 via-neutral-900/40 via-neutral-800/20 to-transparent pointer-events-none rounded-l-lg" />
                
                {/* Page fold shadow effect - crease line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none" />
                
                {/* Subtle page edge shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/10 to-transparent pointer-events-none rounded-r-lg" />
                
                {/* Top and bottom shadows for depth */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent pointer-events-none rounded-t-lg" />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-b-lg" />
                
                {/* Project Content - keeping all original styles with book-like padding */}
                <div className="relative z-10 px-12 md:px-16 py-10 md:py-12">
                  <Project {...currentProject} setPreview={setPreview} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={previousProject}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            currentIndex === 0
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : "bg-neutral-700 text-white hover:bg-neutral-600 hover:scale-105"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        {/* Page Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg">
          <span className="text-neutral-400 text-sm">
            {currentIndex + 1} / {myProjects.length}
          </span>
        </div>

        <button
          onClick={nextProject}
          disabled={currentIndex === myProjects.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            currentIndex === myProjects.length - 1
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : "bg-neutral-700 text-white hover:bg-neutral-600 hover:scale-105"
          }`}
        >
          Next
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default Projects;
