import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import ImageGallery from "@/components/ImageGallery";
import { promptData } from "@/data/promptData";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredByCategory =
    selectedCategory === "all"
      ? promptData
      : promptData.filter((item) => item.category === selectedCategory);

  const filteredPrompts = filteredByCategory.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-700 via-stone-700 to-emerald-700 bg-clip-text text-transparent mb-4">
            Welcome to GeoPrompts
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            A visual library of Earth's imagined features. 
          </p>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ImageGallery prompts={filteredPrompts} />
      </main>
    </div>
  );
};

export default Index;
