import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
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
  const [direction, setDirection] = useState(0);

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
    if (currentImageIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentImageIndex < prompts.length - 1) {
      setDirection(1);
      setCurrentImageIndex((prev) => prev + 1);
    }
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
  }, [isOpen, currentImageIndex]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

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
              {/* Left Arrow */}
              <Button
                variant="ghost"
                size="icon"
                disabled={currentImageIndex === 0}
                onClick={goToPrevious}
                className={`
                  absolute left-4 top-1/2 -translate-y-1/2 z-20
                  bg-stone-800/60 text-white transition
                  ${currentImageIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-stone-700/80"}
                `}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Right Arrow */}
              <Button
                variant="ghost"
                size="icon"
                disabled={currentImageIndex === prompts.length - 1}
                onClick={goToNext}
                className={`
                  absolute right-4 top-1/2 -translate-y-1/2 z-20
                  bg-stone-800/60 text-white transition
                  ${currentImageIndex === prompts.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-stone-700/80"}
                `}
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

          {/* Animated Image with Swipe */}
          <div
            {...swipeHandlers}
            className="flex items-center justify-center h-[60vh] overflow-hidden touch-pan-y"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentPrompt.imageUrl}
                src={`${import.meta.env.BASE_URL}/assets/${currentPrompt.imageUrl}`}
                alt={currentPrompt.title}
                className="max-w-full max-h-full object-contain"
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>

          {/* Info Panel */}
          <div className="bg-stone-800 text-white p-6 max-h-[35vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">{currentPrompt.title}</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {currentPrompt.tags.map((tag) => (
                  <Link to={`/tags/${tag}`} key={tag}>
                    <Badge className="cursor-pointer hover:bg-stone-600">
                      {tag}
                    </Badge>
                  </Link>
                ))}
            </div>

            <div className="bg-stone-700 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-stone-300 mb-2">AI Prompt:</h3>
              <div className="max-h-32 overflow-y-auto">
                <p className="text-sm text-stone-200 leading-relaxed">{currentPrompt.prompt}</p>
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
