import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { promptData } from "@/data/promptData";
import PromptCard from "@/components/PromptCard";

const TagPage = () => {
  const { tag } = useParams();
  const [filteredPrompts, setFilteredPrompts] = useState([]);

  useEffect(() => {
    if (tag) {
      const filtered = promptData.filter((item) =>
        item.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
      setFilteredPrompts(filtered);
    }
  }, [tag]);

  return (
    <div className="bg-emerald-50 min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Prompts tagged with “{tag}”
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((item, index) => (
              <PromptCard
                key={item.id}
                prompt={item}
                index={index}
                onImageClick={() => {}}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No prompts found for this tag.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; // ✅ This closing brace was missing

export default TagPage;
