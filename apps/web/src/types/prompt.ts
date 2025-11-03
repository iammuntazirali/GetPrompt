export type PromptCategory = "image" | "video" | "text" | "code" | "automation";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  votes: number;
  author: string;
  createdAt: string;
  isTrending?: boolean;
}

export interface PromptFormData {
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
}
