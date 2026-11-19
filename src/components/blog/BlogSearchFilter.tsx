import { Search, SlidersHorizontal } from "lucide-react";

export type BlogSort = "newest" | "oldest" | "popular" | "shortest" | "longest";

type BlogSearchFilterProps = {
  search: string;
  category: string;
  sort: BlogSort;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: BlogSort) => void;
};

export default function BlogSearchFilter({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: BlogSearchFilterProps) {
  return (
    <div className="ui-surface p-3">
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
        <label className="relative block min-w-0">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/38" />
          <span className="sr-only">Search posts</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search title, category, author, or excerpt"
            className="h-11 w-full rounded-[6px] border border-[color:var(--border-default)] bg-[#0d0d0d] pl-11 pr-4 text-sm text-bone outline-none transition-colors duration-200 placeholder:text-bone/40 focus:border-[color:var(--border-active)]"
          />
        </label>

        <label className="relative block">
          <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/38" />
          <span className="sr-only">Filter by category</span>
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="h-11 w-full appearance-none rounded-[6px] border border-[color:var(--border-default)] bg-[#0d0d0d] pl-11 pr-4 text-sm text-bone outline-none transition-colors duration-200 focus:border-[color:var(--border-active)]"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Sort posts</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as BlogSort)}
            className="h-11 w-full appearance-none rounded-[6px] border border-[color:var(--border-default)] bg-[#0d0d0d] px-4 text-sm text-bone outline-none transition-colors duration-200 focus:border-[color:var(--border-active)]"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most popular</option>
            <option value="shortest">Shortest read</option>
            <option value="longest">Longest read</option>
          </select>
        </label>
      </div>
    </div>
  );
}
