import { lazy, Suspense } from "react";
import { experiences } from "../constants/index.d";

// Lazy load Timeline component
const Timeline = lazy(() => import("../components/Timeline").then(module => ({ default: module.Timeline })));

export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
  // add other experience properties
}

const Experiences = () => {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-800 rounded w-48 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-neutral-800 rounded w-96"></div>
              <div className="h-4 bg-neutral-800 rounded w-80"></div>
            </div>
          </div>
        </div>
      }>
        <Timeline data={experiences} />
      </Suspense>
    </div>
  );
};

export default Experiences;
