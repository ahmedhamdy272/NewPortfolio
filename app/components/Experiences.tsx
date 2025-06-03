import { Timeline } from "../components/Timeline";
import { experiences } from "../constants/index.d";

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
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
