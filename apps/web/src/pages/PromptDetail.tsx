import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/Tag";
import {
ArrowLeft,
ArrowUp,
ArrowDown,
Copy,
Share2,
Check,
} from "lucide-react";
import { mockPrompts } from "@/lib/mockData";
import { Prompt } from "@/types/prompt";
import { toast } from "sonner";
import { hasVoted, recordVote } from "@/lib/votes";
import { copyToClipboard } from "@/lib/copy";
import { motion } from "framer-motion";

const PromptDetail = () => {
const { id } = useParams();
const navigate = useNavigate();
const [prompt, setPrompt] = useState<Prompt | null>(null);
const [copied, setCopied] = useState(false);
const [voted, setVoted] = useState(false);

useEffect(() => {
  // Load all prompts (user submitted + mock data)
  let allPrompts = [...mockPrompts];
  try {
    const userPrompts = localStorage.getItem("user_prompts");
    if (userPrompts) {
      const parsedUserPrompts = JSON.parse(userPrompts);
      allPrompts = [...parsedUserPrompts, ...mockPrompts];
    }
  } catch (error) {
    // Failed to load user prompts
  }

  const foundPrompt = allPrompts.find((p) => p.id === id);
  if (foundPrompt) {
    setPrompt(foundPrompt);
    setVoted(hasVoted(foundPrompt.id));
  } else {
    toast.error("Prompt not found");
    navigate("/");
  }
}, [id, navigate]);

const handleVote = (direction: "up" | "down") => {
  if (!prompt) return;
  if (hasVoted(prompt.id)) {
    setVoted(true);
    toast.error("You have already voted on this prompt");
    return;
  }

  const updatedPrompt = {
    ...prompt,
    votes: prompt.votes + (direction === "up" ? 1 : -1),
  };

  setPrompt(updatedPrompt);
  recordVote(prompt.id, direction);
  setVoted(true);

  // Update vote count in localStorage for user-submitted prompts
  try {
    const userPrompts = localStorage.getItem("user_prompts");
    if (userPrompts) {
      const parsedUserPrompts = JSON.parse(userPrompts);
      const updatedUserPrompts = parsedUserPrompts.map((p: Prompt) =>
        p.id === prompt.id ? updatedPrompt : p
      );
      localStorage.setItem(
        "user_prompts",
        JSON.stringify(updatedUserPrompts)
      );
    }
  } catch (error) {
    // Failed to update vote
  }

  toast.success(direction === "up" ? "Upvoted! 👍" : "Downvoted 👎");
};

const handleCopy = async () => {
  if (!prompt) return;
  try {
    await copyToClipboard(prompt.content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    toast.error("Copy failed");
  }
};

const handleShare = async () => {
  if (!prompt) return;
  try {
    await navigator.share({
      title: prompt.title,
      text: prompt.description,
      url: window.location.href,
    });
  } catch (err) {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  }
};

if (!prompt) {
  return null;
}

const categoryColors: Record<string, string> = {
  image: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
  video: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  text: "bg-green-500/10 text-green-700 dark:text-green-300",
  code: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  automation: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
};

return (
  <div className="flex min-h-screen flex-col">
    <Navbar />

    <main className="flex-1 container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2 hover:bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to all prompts
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <CardTitle className="text-3xl">{prompt.title}</CardTitle>
                    <p className="text-muted-foreground text-lg">
                      {prompt.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Tag className={categoryColors[prompt.category]}>
                        {prompt.category}
                      </Tag>
                      {prompt.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Prompt Content</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="rounded-lg bg-muted p-4 font-mono text-sm">
                    {prompt.content}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      Created by{" "}
                      <span className="font-medium text-foreground">
                        {prompt.author}
                      </span>
                    </p>
                    <p>{new Date(prompt.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card sticky top-20">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-4 p-6 bg-muted rounded-lg">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-12 w-12 ${
                      voted
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                    onClick={() => handleVote("up")}
                    disabled={voted}
                  >
                    <ArrowUp className="h-6 w-6" />
                  </Button>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{prompt.votes}</div>
                    <div className="text-xs text-muted-foreground">votes</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-12 w-12 ${
                      voted
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-destructive/10 hover:text-destructive"
                    }`}
                    onClick={() => handleVote("down")}
                    disabled={voted}
                  >
                    <ArrowDown className="h-6 w-6" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  Share Prompt
                </Button>

                <Button
                  className="w-full gap-2 gradient-primary text-white hover:opacity-90"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </main>

    <Footer />
  </div>
);
};

export default PromptDetail;
