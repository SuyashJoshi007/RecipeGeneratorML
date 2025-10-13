import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Generate Recipe", href: "/upload" },
  { name: "Examples", href: "/examples" },
];

function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // Re-introducing the NavLink with the animated underline
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`relative px-3 py-2 rounded-md transition-colors text-sm font-medium ${
        pathname === to ? "text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
      {pathname === to && (
        <motion.div
          className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-green-400"
          layoutId="underline"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.36 }}
      className="fixed top-0 left-0 w-full z-50 header-border" // Added class for animated border
    >
      {/* UPDATED: Darker, on-theme frosted glass background */}
      <div className="backdrop-blur-md bg-slate-900/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-8">
          {/* UPDATED: Logo with Verdant AI theme */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-slate-800/80 shadow-sm">
              <Sparkles className="text-green-400 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-bold text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">
              SmartRecipe
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} to={link.href}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/upload" className="inline-flex">
              {/* UPDATED: Gradient CTA button */}
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-black/20 hover:opacity-90 transition-opacity">
                Upload Photo
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {open && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col gap-4 bg-slate-900/90 border-t border-slate-800 rounded-b-lg p-4 backdrop-blur-md">
              {navLinks.map((link) => (
                <NavLink key={link.href} to={link.href}>
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-2">
                <Link to="/upload" onClick={() => setOpen(false)} className="block">
                  <button className="w-full py-2 rounded-full text-white bg-gradient-to-r from-green-500 to-teal-500">
                    Upload Photo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export default Header;