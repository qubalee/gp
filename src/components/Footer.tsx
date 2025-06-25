import { Github, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* GeoPrompts Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-600 via-stone-600 to-emerald-600 rounded"></div>
              <h3 className="text-xl font-bold text-white">GeoPrompts</h3>
            </div>
            <p className="text-stone-400 leading-relaxed">
              A visual library of Earth's imagined features.
            </p>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://github.com/qubalee/gp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-400 hover:text-emerald-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://forms.gle/gwsRVDp7KXNELpLe8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-400 hover:text-emerald-400 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit a Prompt</span>
              </a>
            </div>
          </div>

          {/* Quick Access Column */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Access</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const evt = new CustomEvent("open-rating-overview");
                    window.dispatchEvent(evt);
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Rating Overview
                </a>
              </li>
              <li>
                <a
                  href="/tags"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Browse Tags
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-700 mt-8 pt-8 text-center">
          <p className="text-stone-400">
            © GeoPrompts. All rights reserved.
          </p>
          <p className="text-stone-500 text-sm mt-2">
            Built and maintained by{" "}
            <a
              href="https://qubalee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 underline"
            >
              Dr. Abdullah Alqubalee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
