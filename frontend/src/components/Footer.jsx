import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Mail, Heart, Sparkles, ArrowRight } from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-24 footer-border-top">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand + Blurb */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-6 w-6 text-green-400" />
              <span className="font-bold text-lg bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                SmartRecipe
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              AI-powered recipe generation to turn your ingredients into culinary masterpieces.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4 tracking-wider uppercase">Explore</h4>
            <nav className="flex flex-col gap-3 text-sm">
              <Link to="/" className="text-gray-400 hover:text-green-300 transition-colors">Home</Link>
              <Link to="/upload" className="text-gray-400 hover:text-green-300 transition-colors">Generate Recipe</Link>
              <Link to="/examples" className="text-gray-400 hover:text-green-300 transition-colors">Examples</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-green-300 transition-colors">Privacy Policy</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4 tracking-wider uppercase">Stay Updated</h4>
            <p className="text-sm mb-4 text-gray-400">Get tips, new features, and curated recipes in your inbox.</p>
            <form onSubmit={handleSubscribe} className="relative w-full">
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-4 pr-12 h-11 rounded-full border border-slate-700 bg-slate-800/60 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
            {subscribed && <p className="mt-2 text-sm text-green-400">Thank you for subscribing!</p>}
          </div>

          {/* Social */}
           <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4 tracking-wider uppercase">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="GitHub" className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors">
                <Github className="w-5 h-5 text-gray-400" />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors">
                <Twitter className="w-5 h-5 text-sky-400" />
              </a>
              <a href="mailto:hello@smartrecipe.app" aria-label="Email" className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors">
                <Mail className="w-5 h-5 text-rose-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} SmartRecipe. Built with <Heart className="inline w-4 h-4 text-red-500" /> by <span className="font-medium text-gray-400">Suyash Joshi</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;