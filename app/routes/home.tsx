import type { Route } from "./+types/home";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Experiences from "../components/Experiences";
import Testimonial from "../components/Testimonial";
import Contact from "../components/Contact";

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
        <Hero />
      </section>
      <section className="c-space section-spacing" id="about">
        <About />
      </section>
      <section className="c-space section-spacing" id="projects">
        <Projects />
      </section>
      <section className="c-space section-spacing" id="experiences">
        <Experiences />
      </section>
      <section className="c-space " id="testimonials">
        <Testimonial />
      </section>
      <section className="c-space section-spacing" id="contact">
        <Contact />
      </section>
    </>
  );
}
