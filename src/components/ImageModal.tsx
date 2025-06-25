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

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const ImageModal = ({ prompts, currentIndex, isOpen, onClose }: ImageModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const { toast } = useToast();
  const [direction, setDirection] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [currentImageIndex]);

  useEffect(() => {
    const preloadImage = (index: number) => {
      if (prompts[index]) {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}/assets/${prompts[index].imageUrl}`;
      }
    };
    preloadImage(currentImageIndex + 1);
    preloadImage(currentImageIndex - 1);
  }, [currentImageIndex]);

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

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20 bg-stone-800/60 hover:bg-stone-700/80 text-white"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          {prompts.length > 1 && (
            <>
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

          <div className="absolute top-4 left-4 z-20 bg-stone-800/60 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm text-white">
              {currentImageIndex + 1} / {prompts.length}
            </span>
          </div>

          <div {...swipeHandlers} className="relative h-[60vh] overflow-hidden touch-pan-y">
            <div className="relative w-full h-full">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentPrompt.imageUrl}
                  src={`${import.meta.env.BASE_URL}/assets/${currentPrompt.imageUrl}`}
                  alt={currentPrompt.title}
                  onLoad={() => setIsImageLoaded(true)}
                  className="absolute top-0 left-0 w-full h-full object-contain"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={isImageLoaded ? "center" : false}
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-stone-800 text-white p-6 max-h-[35vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">{currentPrompt.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPrompt.tags.map((tag) => (
                <Link to={`/tags/${tag}`} key={tag}>
                  <Badge className="cursor-pointer hover:bg-stone-600">{tag}</Badge>
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

          <div className="flex overflow-x-auto gap-2 p-4 bg-stone-800 border-t border-stone-700">
            {prompts.map((prompt, index) => (
              <img
                key={prompt.id}
                src={`${import.meta.env.BASE_URL}/assets/${prompt.imageUrl}?w=60&h=45&fit=crop`}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setDirection(index > currentImageIndex ? 1 : -1);
                }}
                className={`cursor-pointer rounded-md border-2 w-[60px] h-[45px] object-cover ${index === currentImageIndex ? 'border-emerald-500' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
