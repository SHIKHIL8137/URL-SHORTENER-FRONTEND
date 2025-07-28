import { Link } from "lucide-react";
import type { NavbarProps } from "../interfaces/data.interfaces";


const Navbar: React.FC<NavbarProps> = ({onNavigateToHome}) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center  items-center py-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateToHome}>
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
              <Link className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">URL Shortener</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;