import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-6 border-b border-green-800 shadow-xl bg-green-950/90 backdrop-blur-lg">
      <div className="relative flex items-center justify-between h-20 navbar">

        {/* Animated Leaf Background */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[url('/leaf.png')] bg-contain bg-no-repeat opacity-10 animate-float" />
          <div className="absolute top-1/4 left-2/3 w-24 h-24 bg-[url('/leaf.png')] bg-contain bg-no-repeat opacity-10 animate-float delay-3000" />
        </div>

        {/* Menu Button */}
        <div className="relative z-10">
          <button
            className="gap-2 btn btn-sm btn-outline text-green-300 border-green-500 hover:bg-green-800 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <Menu size={18} />
            <span className="font-semibold">Menu</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute mt-2 bg-green-900 border border-green-700 shadow-xl rounded-xl w-44 z-50 animate-fade-in">
              <Link
                to="/"
                className="block px-4 py-3 text-sm text-white hover:bg-green-700 transition rounded-t-xl"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/predict"
                className="block px-4 py-3 text-sm text-white hover:bg-green-700 transition rounded-b-xl"
                onClick={() => setIsOpen(false)}
              >
                Predict
              </Link>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mx-auto z-10">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-wider text-green-300 underline underline-offset-4 font-[Playfair_Display]"
          >
            LEAF DOCTOR
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
