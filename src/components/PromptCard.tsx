import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    prompt: string;
    imageUrl: string;
    category: string;
    tags: string[];
  };
  index: number;
  onImageClick: (index: number) => void;
  activeCardId: string | null;
  setActiveCardId: (id: string | null) => void;
}

const PromptCard = ({ prompt, index, onImageClick, activeCardId, setActiveCardId }: PromptCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isRatingMode = activeCardId === prompt.id;
  const { toast } = useToast();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({
    Realism: 0,
    Accuracy: 0,
    Detail: 0,
    Visual: 0,
  });

  const isFullyRated = Object.values(ratings).every((val) => val > 0);

  const submitRatings = async () => {
    await addDoc(collection(db, "ratings"), {
      imageId: prompt.id,
      source: "card",
      ratings,
      timestamp: Timestamp.now(),
    });
    toast({ title: "Thank you!", description: "Your rating has been submitted." });
    setActiveCardId(null); // collapse after submit
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  const handleImageClick = () => {
    onImageClick(index);
  };

  return (
        <Card
          className={`group transition-all duration-500 flex flex-col ${
            isRatingMode ? 'h-auto' : 'h-[500px]'
          } self-start
            ${imageLoaded ? 'animate-fade-in' : 'opacity-0'}
            cursor-pointer hover:shadow-2xl hover:-translate-y-2
            bg-white/90 backdrop-blur-sm border-stone-200`}
          style={{ animationDelay: `${index * 100}ms` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

      <div className="relative overflow-hidden rounded-t-lg" onClick={handleImageClick}>
        <img
          src={`${import.meta.env.BASE_URL}/assets/${prompt.imageUrl}?w=400&h=300&fit=crop`}
          alt={prompt.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onLoad={() => setImageLoaded(true)}
        />
        <div className={`absolute inset-0 bg-stone-900/60 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-sm font-medium bg-stone-800/50 px-3 py-1 rounded-full">
              Click to zoom
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="mb-3 flex flex-col gap-0.5 text-stone-800 min-h-[3.5rem]">
          <span
            className="text-[11px] text-stone-500 font-mono cursor-pointer hover:text-stone-700"
            onClick={() => {
              navigator.clipboard.writeText(prompt.id);
              toast({ title: "ID Copied", description: prompt.id });
            }}
          >
            ID: {prompt.id}
          </span>
          <h3 className="font-semibold text-lg leading-snug line-clamp-2">{prompt.title}</h3>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {prompt.tags.slice(0, 3).map((tag) => (
            <Link to={`/tags/${tag}`} key={tag}>
              <Badge
                variant="secondary"
                className="text-xs bg-stone-200 text-stone-700 hover:bg-stone-300 cursor-pointer"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="flex-grow mb-4">
          <p className="text-sm text-stone-600 leading-relaxed line-clamp-4">
            {prompt.prompt}
          </p>
        </div>

        <Button
          onClick={copyPrompt}
          size="sm"
          className="w-full bg-gradient-to-r from-amber-600 via-stone-600 to-emerald-600 hover:from-amber-700 hover:via-stone-700 hover:to-emerald-700 transition-all duration-300 text-white shadow-md mt-auto"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Prompt
        </Button>

        {!isRatingMode ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-2"
            onClick={(e) => {
              e.stopPropagation();
              setActiveCardId(prompt.id);
            }}
          >
            📊 Rate Image
          </Button>
        ) : (
          <div className="mt-2 space-y-2">
            {["Realism", "Accuracy", "Detail", "Visual"].map((criterion) => (
              <div key={criterion}>
                <label className="text-xs text-stone-600">{criterion}</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      className={`cursor-pointer text-xl ${ratings[criterion] >= val ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() =>
                        setRatings((prev) => ({ ...prev, [criterion]: val }))
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={submitRatings}
                disabled={!isFullyRated}
                className="flex-1 bg-emerald-600 text-white disabled:opacity-40"
              >
                Submit Rating
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveCardId(null)} // ✅ collapse card
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromptCard;
