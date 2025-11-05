
import { useState, lazy, Suspense } from "react";

// Lazy load ProjectDetails modal - only loads when user clicks "Read More"
const ProjectDetails = lazy(() => import("./ProjectDetails"));

interface Tag {
  id: string | number;
  name: string;
  path: string;
}

interface ProjectProps {
  title: string;
  description: string;
  subDescription: string[];
  href: string;
  image: string;
  tags: Tag[];
  setPreview: (image: string | null) => void;
}

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}: ProjectProps) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsHidden(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation"
        >
          Read More
          <img src="assets/arrow-right.svg" className="w-5" alt="Arrow right" loading="eager" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
              <div className="animate-pulse">
                <div className="w-64 h-64 bg-neutral-800 rounded-lg"></div>
              </div>
            </div>
          }
        >
          <ProjectDetails
            title={title}
            description={description}
            subDescription={subDescription}
            image={image}
            tags={tags}
            href={href}
            closeModal={() => setIsHidden(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default Project;
