
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageModalProps {
  prompts: {
    id: string;
    title: string;
    prompt: string;
    imageUrl: string;
    category: string;
    tags: string[];
  }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ prompts, currentIndex, isOpen, onClose }: ImageModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentImageIndex(currentIndex);
  }, [currentIndex]);

  const currentPrompt = prompts[currentImageIndex];

  const copyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt.prompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prompts.length - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev < prompts.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  if (!currentPrompt) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-stone-900 border-stone-700">
        <div className="relative h-full">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20 bg-stone-800/60 hover:bg-stone-700/80 text-white"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Navigation Buttons */}
          {prompts.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-stone-800/60 hover:bg-stone-700/80 text-white"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-stone-800/60 hover:bg-stone-700/80 text-white"
                onClick={goToNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-20 bg-stone-800/60 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm text-white">
              {currentImageIndex + 1} / {prompts.length}
            </span>
          </div>

          {/* Main Image */}
          <div className="flex items-center justify-center h-[60vh]">
            <img
              src={`${import.meta.env.BASE_URL}/assets/${currentPrompt.imageUrl}`}
              alt={currentPrompt.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Bottom Info Panel */}
          <div className="bg-stone-800 text-white p-6 max-h-[35vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">{currentPrompt.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPrompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-stone-700 text-stone-200 hover:bg-stone-600">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="bg-stone-700 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-stone-300 mb-2">AI Prompt:</h3>
              <div className="max-h-32 overflow-y-auto">
                <p className="text-sm text-stone-200 leading-relaxed">
                  {currentPrompt.prompt}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={copyPrompt}
              className="w-full bg-gradient-to-r from-amber-600 via-stone-600 to-emerald-600 hover:from-amber-700 hover:via-stone-700 hover:to-emerald-700 transition-all duration-300 text-white"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Prompt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
