import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Added for linking tags
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

const PromptCard = ({ prompt, index, onImageClick }: PromptCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

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
      className={`
        group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-stone-200 flex flex-col h-full
        ${imageLoaded ? 'animate-fade-in' : 'opacity-0'}
      `}
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
        <div className={`
          absolute inset-0 bg-stone-900/60 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-sm font-medium bg-stone-800/50 px-3 py-1 rounded-full">
              Click to zoom
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-stone-800 min-h-[3.5rem]">{prompt.title}</h3>
        
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
      </CardContent>
    </Card>
  );
};

export default PromptCard;
