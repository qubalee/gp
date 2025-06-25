import { useState } from "react";
import PromptCard from "@/components/PromptCard";
import ImageModal from "@/components/ImageModal";

interface PromptType {
  id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

interface ImageGalleryProps {
  prompts: PromptType[];
}

const ImageGallery = ({ prompts }: ImageGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setActiveCardId(null); // Close any open rating state
  };

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visiblePrompts = prompts.slice(0, visibleCount);

  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 [grid-auto-rows:minmax(0,_auto)]">
        {visiblePrompts.map((prompt, index) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            index={index}
            onImageClick={handleImageClick}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
        ))}
      </div>

      {visibleCount < prompts.length && (
        <div className="text-center mt-6">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-md shadow transition-all duration-300"
          >
            Show More
          </button>
        </div>
      )}

      <ImageModal
        prompts={prompts}
        currentIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ImageGallery;
