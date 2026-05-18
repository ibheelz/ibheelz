import Link from "next/link";
import CategoryPill from "./CategoryPill";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
}

export default function BlogCard({ slug, title, description, category, readTime }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="border border-surface bg-surface p-5 hover:border-red transition-colors duration-200 cursor-pointer h-full flex flex-col">
        <h3 className="text-xl font-medium text-white mb-3 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted line-clamp-2 flex-1 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <CategoryPill label={category} color="text-white" />
          <span className="text-xs text-muted">{readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
