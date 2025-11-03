import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isSearching: boolean;
}

export const SearchSection = ({
  searchQuery,
  onSearchChange,
  isSearching,
}: SearchSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex justify-center pb-10"
      style={{ paddingBottom: isSearching ? "1rem" : "2.5rem" }}
    >
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search your prompt"
      />
    </motion.div>
  );
};
