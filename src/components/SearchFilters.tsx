
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const popularTags = [
  "React", "TypeScript", "Node.js", "Python", "Vue.js", "Angular", 
  "Next.js", "Express", "MongoDB", "PostgreSQL", "AWS", "Docker"
];

const SearchFilters = ({ searchQuery, setSearchQuery, selectedTags, setSelectedTags }: SearchFiltersProps) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input 
              type="text" 
              placeholder="Search projects, developers, or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <Button 
          variant="outline" 
          onClick={() => setShowAllTags(!showAllTags)}
          className="border-white/20 text-white hover:bg-white/10 self-start"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tags */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Popular Technologies</h3>
          {selectedTags.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(showAllTags ? popularTags : popularTags.slice(0, 8)).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedTags.includes(tag) 
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0" 
                  : "border-white/30 text-white/80 hover:bg-white/10"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
          
          {!showAllTags && popularTags.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTags(true)}
              className="text-white/70 hover:text-white hover:bg-white/10 h-6 px-2 text-xs"
            >
              +{popularTags.length - 8} more
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || selectedTags.length > 0) && (
        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Active filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="border-white/30 text-white/80">
                Search: "{searchQuery}"
              </Badge>
            )}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/30 text-white/80">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
