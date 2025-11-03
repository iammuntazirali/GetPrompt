import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users, Zap, LucideIcon } from "lucide-react";

interface HeroSectionProps {
  stats: {
    total: number;
    trending: number;
    totalVotes: number;
    categories: number;
  };
  isSearching: boolean;
}

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  color: string;
}

const StatCard = ({ icon: Icon, value, label, color }: StatCardProps) => (
  <div className="flex items-center gap-3">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="text-left">
      <div className="text-2xl font-bold">{value}+</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  </div>
);

export const HeroSection = ({ stats, isSearching }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden gradient-subtle border-b mb-xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container relative space-y-10">
        {/* Hero Content - Collapse when searching */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isSearching ? 0 : 1,
            y: 0,
            height: isSearching ? 0 : "auto",
            marginTop: isSearching ? 0 : "4rem",
            marginBottom: isSearching ? 0 : undefined,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
          style={{ paddingTop: isSearching ? 0 : undefined }}
        >
          <div className="text-center space-y-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              <Sparkles className="h-4 w-4" />
              <span>Welcome to GetPrompt</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight px-4">
              Discover Amazing <span className="gradient-text">AI Prompts</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Discover powerful prompts, share your own, and explore the ideas
              driving the future of generative AI.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 md:gap-8 pt-6"
            >
              <StatCard
                icon={Sparkles}
                value={stats.total}
                label="Prompts"
                color="bg-primary/10 text-primary"
              />
              <StatCard
                icon={TrendingUp}
                value={stats.trending}
                label="Trending"
                color="bg-orange-500/10 text-orange-600 dark:text-orange-400"
              />
              <StatCard
                icon={Zap}
                value={stats.totalVotes}
                label="Total Votes"
                color="bg-green-500/10 text-green-600 dark:text-green-400"
              />
              <StatCard
                icon={Users}
                value={stats.categories}
                label="Categories"
                color="bg-blue-500/10 text-blue-600 dark:text-blue-400"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
