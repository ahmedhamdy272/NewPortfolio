import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-li">
        <Link to="#about" className="nav-link">
          About
        </Link>
      </li>
      <li className="nav-li">
        <Link to="#projects" className="nav-link">
          Projects
        </Link>
      </li>
      <li className="nav-li">
        <Link to="#experiences" className="nav-link">
          Experiences
        </Link>
      </li>
      <li className="nav-li">
        <Link to="#contact" className="nav-link">
          Contact
        </Link>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <Link
            to="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Portfolio
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt={isOpen ? "Close menu" : "Open menu"}
              className="w-6 h-6"
              loading="eager"
            />
          </button>

          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          style={{ maxHeight: "100vh" }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
