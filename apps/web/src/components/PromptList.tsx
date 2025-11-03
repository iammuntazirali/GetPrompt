import { Prompt } from "@/types/prompt";
import { PromptCard } from "./PromptCard";
import { SkeletonCard } from "./SkeletonCard";

interface PromptListProps {
  prompts: Prompt[];
  onVote: (id: string, direction: "up" | "down") => void;
  loading?: boolean;
}

export const PromptList = ({ prompts, onVote, loading }: PromptListProps) => {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No prompts found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt, index) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onVote={onVote}
          index={index}
        />
      ))}
    </div>
  );
};
