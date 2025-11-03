import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag } from "@/components/Tag";
import { categories, allTags } from "@/lib/mockData";
import { PromptFormData, PromptCategory } from "@/types/prompt";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";

interface SubmitFormProps {
  formData: PromptFormData;
  setFormData: (data: PromptFormData) => void;
  validations: {
    title: boolean;
    description: boolean;
    content: boolean;
    tags: boolean;
  };
  isFormValid: boolean;
  isSubmitting: boolean;
  onTagToggle: (tag: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ValidationIcon = ({ isValid, show }: { isValid: boolean; show: boolean }) => {
  if (!show) return null;
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {isValid ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <AlertCircle className="h-5 w-5 text-orange-500" />
      )}
    </motion.div>
  );
};

export const SubmitForm = ({
  formData,
  setFormData,
  validations,
  isFormValid,
  isSubmitting,
  onTagToggle,
  onSubmit,
  onCancel,
}: SubmitFormProps) => {
  const charCount = {
    title: formData.title.length,
    description: formData.description.length,
    content: formData.content.length,
  };

  return (
    <Card className="glass-card shadow-lg border-border/40">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl">Submit a Prompt</CardTitle>
            <CardDescription className="text-base mt-1">
              Share your creative AI prompt with the community
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium flex items-center justify-between">
              <span>Prompt Title *</span>
              <span className="text-xs text-muted-foreground font-normal">
                {charCount.title}/100
              </span>
            </Label>
            <div className="relative">
              <Input
                id="title"
                placeholder="e.g., Ultra-Realistic Portrait Generator"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value.slice(0, 100) })
                }
                className="text-base pr-12"
                maxLength={100}
              />
              <ValidationIcon isValid={validations.title} show={charCount.title > 0} />
            </div>
            <p className="text-xs text-muted-foreground">
              Min 5 characters. Make it descriptive and engaging.
            </p>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium flex items-center justify-between">
              <span>Description *</span>
              <span className="text-xs text-muted-foreground font-normal">
                {charCount.description}/500
              </span>
            </Label>
            <div className="relative">
              <Textarea
                id="description"
                placeholder="Brief description of what this prompt does and its use cases..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value.slice(0, 500) })
                }
                rows={3}
                className="text-base resize-none"
                maxLength={500}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Min 10 characters. Explain what makes your prompt unique.
            </p>
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-base font-medium flex items-center justify-between">
              <span>Prompt Content *</span>
              <span className="text-xs text-muted-foreground font-normal">
                {charCount.content}/2000
              </span>
            </Label>
            <Textarea
              id="content"
              placeholder="Enter your full prompt here...

Example: Create a [subject] in [style] with [specific details]..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value.slice(0, 2000) })
              }
              rows={8}
              className="font-mono text-sm resize-none"
              maxLength={2000}
            />
            <p className="text-xs text-muted-foreground">
              Min 20 characters. Use [brackets] for variables users should customize.
            </p>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-medium">
              Category *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value as PromptCategory })
              }
            >
              <SelectTrigger id="category" className="text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags Field */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center justify-between">
              <span>Tags *</span>
              <span className="text-xs text-muted-foreground font-normal">
                {formData.tags.length} selected
              </span>
            </Label>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {allTags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Tag
                      active={formData.tags.includes(tag)}
                      onClick={() => onTagToggle(tag)}
                    >
                      {tag}
                    </Tag>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <p className="text-xs text-muted-foreground">
              Select at least one tag to help others discover your prompt.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-primary text-white hover:opacity-90 gap-2"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Submit Prompt
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
