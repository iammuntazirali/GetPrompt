import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SearchSection } from "@/components/home/SearchSection";
import { CategoryFilters } from "@/components/home/CategoryFilters";
import { TagFilters } from "@/components/home/TagFilters";
import { PromptsGrid } from "@/components/home/PromptsGrid";
import { usePrompts } from "@/hooks/usePrompts";

const Index = () => {
  const {
    filteredPrompts,
    searchQuery,
    selectedTags,
    selectedCategory,
    isSearching,
    stats,
    setSearchQuery,
    setSelectedCategory,
    toggleTag,
    clearFilters,
    handleVote,
  } = usePrompts();

  const hasActiveFilters =
    searchQuery.length > 0 ||
    selectedTags.length > 0 ||
    selectedCategory !== "all";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Stats */}
        <HeroSection stats={stats} isSearching={isSearching} />

        {/* Search Bar */}
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSearching={isSearching}
        />

        {/* Category Filters - Hidden when searching */}
        {!isSearching && (
          <CategoryFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {/* Tag Filters - Hidden when searching */}
        {!isSearching && (
          <TagFilters
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            onClearTags={() => clearFilters()}
          />
        )}

        {/* Prompts Grid */}
        <PromptsGrid
          filteredPrompts={filteredPrompts}
          isSearching={isSearching}
          searchQuery={searchQuery}
          onClearFilters={clearFilters}
          onVote={handleVote}
          hasActiveFilters={hasActiveFilters}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
