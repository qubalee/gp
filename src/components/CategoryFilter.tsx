
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: "all", name: "All", color: "bg-stone-500" },
  { id: "2D Images", name: "2D Images", color: "bg-amber-600" },
  { id: "3D Models", name: "3D Models", color: "bg-emerald-600" },
  { id: "Direct Prompts", name: "Direct Prompts", color: "bg-slate-600" },
  { id: "Enhanced Prompts", name: "Enhanced Prompts", color: "bg-orange-600" },
  { id: "Text to Image", name: "Text to Image", color: "bg-red-700" },
  { id: "Image to Image", name: "Image to Image", color: "bg-teal-600" },
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => setSelectedCategory(category.id)}
          className={`
            relative overflow-hidden transition-all duration-300 hover:scale-105
            ${selectedCategory === category.id 
              ? 'bg-gradient-to-r from-amber-600 via-stone-600 to-emerald-600 text-white shadow-lg' 
              : 'hover:bg-stone-50 border-stone-300 text-stone-700'
            }
          `}
        >
          <span className={`w-2 h-2 rounded-full ${category.color} mr-2`}></span>
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
