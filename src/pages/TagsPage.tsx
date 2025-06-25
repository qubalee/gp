import { Link } from "react-router-dom";
import { promptData } from "@/data/promptData";

const TagsPage = () => {
  const tags = Array.from(new Set(promptData.flatMap((item) => item.tags))).sort();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Tags</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`/tags/${tag}`}
            className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm hover:bg-emerald-200"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
