import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PromptFormData, PromptCategory } from "@/types/prompt";
import { toast } from "sonner";

export const useSubmitForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PromptFormData>({
    title: "",
    description: "",
    content: "",
    category: "text",
    tags: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation helpers
  const validations = {
    title: formData.title.trim().length >= 5,
    description: formData.description.trim().length >= 10,
    content: formData.content.trim().length >= 20,
    tags: formData.tags.length > 0,
  };

  const isFormValid = Object.values(validations).every(Boolean);

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation with better messages
    if (!validations.title) {
      toast.error("Title must be at least 5 characters");
      return;
    }
    if (!validations.description) {
      toast.error("Description must be at least 10 characters");
      return;
    }
    if (!validations.content) {
      toast.error("Prompt content must be at least 20 characters");
      return;
    }
    if (!validations.tags) {
      toast.error("Please select at least one tag");
      return;
    }

    setIsSubmitting(true);

    // Create new prompt object
    const newPrompt = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      content: formData.content.trim(),
      category: formData.category,
      tags: formData.tags,
      votes: 0,
      author: "You",
      createdAt: new Date().toISOString(),
      isTrending: false,
    };

    // Save to localStorage with animation
    try {
      setTimeout(() => {
        const existingPrompts = localStorage.getItem("user_prompts");
        const prompts = existingPrompts ? JSON.parse(existingPrompts) : [];
        prompts.unshift(newPrompt);
        localStorage.setItem("user_prompts", JSON.stringify(prompts));
        
        toast.success("Prompt submitted successfully! 🎉");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }, 800);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Failed to save prompt. Please try again.");
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    validations,
    isFormValid,
    handleTagToggle,
    handleSubmit,
  };
};
