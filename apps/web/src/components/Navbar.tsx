import { Link } from "react-router-dom";
import { Moon, Sun, Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'border-b border-border/40 glass-card backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm' 
          : 'border-b border-transparent bg-transparent'
      }`}
    >      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary"
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold gradient-text">GetPrompt</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-smooth hover:scale-110"
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </motion.div>
          </Button>
          
          <Link to="/submit">
            <Button className="gradient-primary text-white hover:opacity-90 transition-smooth gap-2 shadow-lg hover:shadow-xl">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Submit Prompt</span>
              <span className="sm:hidden">Submit</span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
