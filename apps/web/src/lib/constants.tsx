import { Image, Video, FileText, Code, Workflow } from "lucide-react";

export const categoryIcons: Record<string, React.ReactNode> = {
  image: <Image className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  text: <FileText className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
  automation: <Workflow className="h-5 w-5" />,
};

export const categoryIconsSmall: Record<string, React.ReactNode> = {
  image: <Image className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  text: <FileText className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
  automation: <Workflow className="h-4 w-4" />,
};
