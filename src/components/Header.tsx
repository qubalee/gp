
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => {
  return (
    <header className="bg-stone-100/80 backdrop-blur-md border-b border-stone-300 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-600 via-stone-600 to-emerald-600 rounded-lg"></div>
            <span className="text-xl font-bold text-stone-800">GeoPrompts</span>
          </div>
          
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-500 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-stone-300 focus:border-emerald-500 focus:ring-emerald-500 bg-white/90"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
