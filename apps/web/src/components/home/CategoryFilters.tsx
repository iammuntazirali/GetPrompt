import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/mockData";
import { PromptCategory } from "@/types/prompt";
import { categoryIconsSmall } from "@/lib/constants";
import { Sparkles } from "lucide-react";

interface CategoryFiltersProps {
  selectedCategory: PromptCategory | "all";
  onCategoryChange: (category: PromptCategory | "all") => void;
}

export const CategoryFilters = ({
  selectedCategory,
  onCategoryChange,
}: CategoryFiltersProps) => {
  return (
    <section className="border-b bg-background/1 backdrop-blur">
      <div className="container py-3 md:py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-2"
        >
          <h3 className="text-xs md:text-sm font-medium text-muted-foreground">
            Browse by category:
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange("all")}
              className="gap-1.5 shrink-0 h-8 px-3 text-xs md:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(cat.value as PromptCategory)}
                className="gap-1.5 shrink-0 h-8 px-3 text-xs md:text-sm"
              >
                {categoryIconsSmall[cat.value]}
                <span className="hidden sm:inline">{cat.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
