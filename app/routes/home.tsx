import { lazy, Suspense } from "react";
import type { Route } from "./+types/home";

// Lazy load components for better performance
const Hero = lazy(() => import("../components/Hero"));
const About = lazy(() => import("../components/About"));
const Projects = lazy(() => import("../components/Projects"));
const Experiences = lazy(() => import("../components/Experiences"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Contact = lazy(() => import("../components/Contact"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-pulse">
      <div className="h-8 bg-neutral-800 rounded w-48 mb-4"></div>
      <div className="h-4 bg-neutral-800 rounded w-96"></div>
    </div>
  </div>
);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Full Stack Developer Portfolio" },
    {
      name: "description",
      content:
        "Portfolio website of Ahmed Hamdy, a Full Stack Developer showcasing projects and experiences.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
      </section>
      <section className="c-space section-spacing" id="about">
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
      </section>
      <section className="c-space section-spacing" id="projects">
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
      </section>
      <section className="c-space section-spacing" id="experiences">
        <Suspense fallback={<SectionLoader />}>
          <Experiences />
        </Suspense>
      </section>
      <section className="c-space " id="testimonials">
        <Suspense fallback={<SectionLoader />}>
          <Testimonial />
        </Suspense>
      </section>
      <section className="c-space section-spacing" id="contact">
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </section>
    </>
  );
}
