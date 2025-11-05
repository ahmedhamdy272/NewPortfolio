import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { myProjects } from "../constants/index.d";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Lazy load Project component
const Project = lazy(() => import("../components/Project"));

// Lazy loaded project wrapper with Intersection Observer
const LazyProject = ({ project, setPreview }: { project: typeof myProjects[0]; setPreview: (image: string | null) => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before the element comes into view
        threshold: 0.01,
      }
    );

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, []);

  return (
    <div ref={projectRef}>
      {isVisible ? (
        <Suspense
          fallback={
            <div className="py-10 min-h-[200px] animate-pulse">
              <div className="h-6 bg-neutral-800 rounded w-1/3 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-4 bg-neutral-800 rounded w-20"></div>
                <div className="h-4 bg-neutral-800 rounded w-20"></div>
              </div>
            </div>
          }
        >
          <Project {...project} setPreview={setPreview} />
        </Suspense>
      ) : (
        <div className="py-10 min-h-[200px] animate-pulse">
          <div className="h-6 bg-neutral-800 rounded w-1/3 mb-4"></div>
          <div className="flex gap-2">
            <div className="h-4 bg-neutral-800 rounded w-20"></div>
            <div className="h-4 bg-neutral-800 rounded w-20"></div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
      id="work"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {myProjects.map((project) => (
        <LazyProject key={project.id} project={project} setPreview={setPreview} />
      ))}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          alt="Project preview"
          style={{ x: springX, y: springY }}
          loading="eager"
          decoding="async"
        />
      )}
    </section>
  );
};

export default Projects;
