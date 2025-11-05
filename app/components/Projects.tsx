import { useState } from "react";
import { myProjects } from "../constants/index.d";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for previous, 1 for next

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
    <section className="relative c-space section-spacing" id="work">
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      
      <div className="flex justify-center items-center my-16 min-h-[600px] perspective-1000">
        <div className="relative w-full max-w-4xl">
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
              {/* Book Page Front */}
              <div
                className="relative w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-lg shadow-2xl p-8 md:p-12 border border-neutral-700"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Paper texture effect */}
                <div
                  className="absolute inset-0 rounded-lg opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='paper' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='0.5' fill='%23fff'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23paper)'/%3E%3C/svg%3E")`,
                    pointerEvents: "none",
                  }}
                />
                
                {/* Book Spine Shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/50 to-transparent rounded-l-lg" />
                
                <div className="relative z-10">
                  {/* Project Image */}
                  <div className="mb-6 overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>

                  {/* Project Title */}
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    {currentProject.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-neutral-300 text-base md:text-lg mb-6 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-full text-sm text-sand backdrop-blur-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  {currentProject.href && (
                    <a
                      href={currentProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aqua to-mint text-primary font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      View Project
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
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
    </section>
  );
};

export default Projects;
