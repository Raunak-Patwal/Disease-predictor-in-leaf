import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 px-6 border-b border-green-800 shadow-md md:px-12 bg-green-950/80 backdrop-blur-md">
      <div className="relative flex items-center justify-between h-20 navbar">
        
        {/* Left: Menu Button */}
        <div className="absolute left-0">
          <button
            className="gap-2 btn btn-sm btn-success btn-outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={18} />
            Menu
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-50 w-40 mt-2 bg-green-900 border border-green-700 shadow-lg rounded-xl">
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-white hover:bg-green-800 rounded-t-xl"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/predict"
                className="block px-4 py-2 text-sm text-white hover:bg-green-800 rounded-b-xl"
                onClick={() => setIsOpen(false)}
              >
                Predict
              </Link>
            </div>
          )}
        </div>

        {/* Center: Title */}
        <div className="mx-auto">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-widest text-green-300"
          >
             LEAF DOCTOR
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
