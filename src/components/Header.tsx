import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ import Link

const Header = () => {
  const [showOverview, setShowOverview] = useState(false);

  return (
    <>
      <header className="bg-stone-100/80 backdrop-blur-md border-b border-stone-300 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* ✅ Logo with home link */}
            <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 via-stone-600 to-emerald-600 rounded-lg"></div>
              <span className="text-xl font-bold text-stone-800">GeoPrompts</span>
            </Link>

            {/* ✅ Tags + Rating Overview Buttons */}
            <div className="flex space-x-4 justify-end">
              <Link
                to="/tags"
                className="text-sm font-medium text-stone-700 hover:text-stone-900 hover:underline"
              >
                Tags
              </Link>

              <button
                onClick={() => setShowOverview(true)}
                className="text-sm font-medium text-stone-700 hover:text-stone-900 hover:underline"
              >
                Rating Overview
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Rating Overview Modal */}
      {showOverview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-stone-800">Rating Overview</h2>

            <div className="space-y-3 text-sm text-stone-700">
              <div>
                <strong>Realism:</strong> How lifelike or believable the image appears. This includes lighting, textures, and natural rendering.
              </div>
              <div>
                <strong>Accuracy:</strong> How well the image matches the prompt (correct objects, quantities, logic, etc.).
              </div>
              <div>
                <strong>Detail:</strong> Level of visual richness like textures, shadows, and small objects.
              </div>
              <div>
                <strong>Visual Appeal:</strong> The overall artistic quality — composition, colors, and emotional impact.
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowOverview(false)}
                className="text-emerald-600 hover:underline text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
