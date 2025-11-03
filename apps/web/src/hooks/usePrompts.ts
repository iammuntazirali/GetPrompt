import { useState, useMemo, useEffect } from "react";
import { mockPrompts } from "@/lib/mockData";
import { Prompt, PromptCategory } from "@/types/prompt";

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    try {
      const userPrompts = localStorage.getItem("user_prompts");
      const parsedUserPrompts = userPrompts ? JSON.parse(userPrompts) : [];
      return [...parsedUserPrompts, ...mockPrompts];
    } catch (error) {
      return mockPrompts;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | "all">("all");
  const [loading, setLoading] = useState(false);

  const isSearching = searchQuery.trim().length > 0;

  // Reload prompts when localStorage changes
  useEffect(() => {
    const reloadPrompts = () => {
      try {
        const userPrompts = localStorage.getItem("user_prompts");
        const parsedUserPrompts = userPrompts ? JSON.parse(userPrompts) : [];
        setPrompts([...parsedUserPrompts, ...mockPrompts]);
      } catch (error) {
        setPrompts(mockPrompts);
      }
    };

    window.addEventListener("storage", reloadPrompts);
    window.addEventListener("focus", reloadPrompts);

    return () => {
      window.removeEventListener("storage", reloadPrompts);
      window.removeEventListener("focus", reloadPrompts);
    };
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch =
        searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => prompt.tags.includes(tag));

      const matchesCategory =
        selectedCategory === "all" || prompt.category === selectedCategory;

      return matchesSearch && matchesTags && matchesCategory;
    });
  }, [prompts, searchQuery, selectedTags, selectedCategory]);

  const stats = useMemo(() => {
    const totalVotes = prompts.reduce((sum, p) => sum + p.votes, 0);
    const trendingCount = prompts.filter((p) => p.isTrending).length;
    return {
      total: prompts.length,
      trending: trendingCount,
      totalVotes,
      categories: 5,
    };
  }, [prompts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedCategory("all");
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleVote = (id: string, direction: "up" | "down") => {
    setPrompts((prevPrompts) => {
      const updatedPrompts = prevPrompts.map((prompt) => {
        if (prompt.id === id) {
          return {
            ...prompt,
            votes: direction === "up" ? prompt.votes + 1 : prompt.votes - 1,
          };
        }
        return prompt;
      });

      // Update localStorage for user prompts
      try {
        const userPrompts = localStorage.getItem("user_prompts");
        if (userPrompts) {
          const parsedUserPrompts = JSON.parse(userPrompts);
          const updatedUserPrompts = parsedUserPrompts.map((prompt: Prompt) => {
            if (prompt.id === id) {
              return {
                ...prompt,
                votes: direction === "up" ? prompt.votes + 1 : prompt.votes - 1,
              };
            }
            return prompt;
          });
          localStorage.setItem("user_prompts", JSON.stringify(updatedUserPrompts));
        }
      } catch (error) {
        console.error("Failed to update votes in localStorage", error);
      }

      return updatedPrompts;
    });
  };

  return {
    prompts,
    filteredPrompts,
    searchQuery,
    selectedTags,
    selectedCategory,
    loading,
    isSearching,
    stats,
    setSearchQuery: handleSearchChange,
    setSelectedCategory,
    toggleTag,
    clearFilters,
    handleVote,
  };
};
