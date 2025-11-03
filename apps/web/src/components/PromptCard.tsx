import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, TrendingUp, Copy, Check } from "lucide-react";
import { Prompt } from "@/types/prompt";
import { Tag } from "./Tag";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/copy";
import { hasVoted, recordVote } from "@/lib/votes";

interface PromptCardProps {
  prompt: Prompt;
  onVote: (id: string, direction: "up" | "down") => void;
  index?: number;
}

export const PromptCard = ({ prompt, onVote, index = 0 }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const [voted, setVoted] = useState<boolean>(() => hasVoted(prompt.id));
  const categoryColors: Record<string, string> = {
    image: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    video: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    text: "bg-green-500/10 text-green-700 dark:text-green-300",
    code: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    automation: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="hover-lift"
    >
      <Link to={`/prompts/${prompt.id}`}>
        <Card className="glass-card shadow-card hover:shadow-card-hover hover:glow-purple transition-smooth cursor-pointer h-full group relative overflow-hidden">
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                    {prompt.title}
                  </CardTitle>
                  {prompt.isTrending && (
                    <div className="flex items-center gap-1 text-xs font-medium text-primary">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {prompt.description}
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 p-0 ${voted ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/10 hover:text-primary"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasVoted(prompt.id)) {
                      setVoted(true);
                      toast.error("You have already voted on this prompt");
                      return;
                    }
                    onVote(prompt.id, "up");
                    recordVote(prompt.id, "up");
                    setVoted(true);
                  }}
                  aria-label="Upvote"
                  disabled={voted}
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </Button>
                <span className="text-sm font-semibold">{prompt.votes}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 p-0 ${voted ? "opacity-60 cursor-not-allowed" : "hover:bg-destructive/10 hover:text-destructive"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (hasVoted(prompt.id)) {
                      setVoted(true);
                      toast.error("You have already voted on this prompt");
                      return;
                    }
                    onVote(prompt.id, "down");
                    recordVote(prompt.id, "down");
                    setVoted(true);
                  }}
                  aria-label="Downvote"
                  disabled={voted}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 p-0 mt-1 text-muted-foreground hover:bg-muted/20"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                      await copyToClipboard(prompt.content);
                      setCopied(true);
                      toast.success("Copied prompt");
                      setTimeout(() => setCopied(false), 1500);
                    } catch (err) {
                      // fallback notification
                      toast.error("Copy failed");
                    }
                  }}
                  aria-label="Copy prompt"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Tag className={categoryColors[prompt.category]}>
                {prompt.category}
              </Tag>
              {prompt.tags.slice(0, 3).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>by {prompt.author}</span>
              <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
