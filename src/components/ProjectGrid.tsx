
import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  isPrivate: boolean;
  likes: number;
  views: number;
  collaborators: number;
}

interface ProjectGridProps {
  searchQuery: string;
  selectedTags: string[];
}

// Mock data - this will be replaced with Supabase data
const mockProjects: Project[] = [
  {
    id: "1",
    title: "TaskFlow - Project Management App",
    description: "A modern project management tool built with React and Node.js. Features real-time collaboration, task tracking, and team analytics.",
    image: "/placeholder.svg",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg"
    },
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    isPrivate: false,
    likes: 124,
    views: 1250,
    collaborators: 3
  },
  {
    id: "2",
    title: "AI Code Review Assistant",
    description: "An intelligent code review tool that uses machine learning to provide automated feedback and suggestions for code improvements.",
    image: "/placeholder.svg",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg"
    },
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    isPrivate: true,
    likes: 89,
    views: 890,
    collaborators: 2
  },
  {
    id: "3",
    title: "EcoTrack - Sustainability Platform",
    description: "Track your carbon footprint and discover eco-friendly alternatives. Built with Vue.js and featuring beautiful data visualizations.",
    image: "/placeholder.svg",
    author: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg"
    },
    tags: ["Vue.js", "TypeScript", "PostgreSQL", "AWS"],
    isPrivate: false,
    likes: 156,
    views: 2100,
    collaborators: 4
  },
  {
    id: "4",
    title: "DevPortfolio Generator",
    description: "Automatically generate stunning developer portfolios from GitHub data. Features customizable themes and one-click deployment.",
    image: "/placeholder.svg",
    author: {
      name: "Alex Kim",
      avatar: "/placeholder.svg"
    },
    tags: ["Next.js", "GitHub API", "Vercel", "Tailwind"],
    isPrivate: false,
    likes: 203,
    views: 3200,
    collaborators: 1
  }
];

const ProjectGrid = ({ searchQuery, selectedTags }: ProjectGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter projects based on search and tags
  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => project.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Featured Projects
          </h2>
          <p className="text-white/70">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-white/70">Try adjusting your search terms or filters</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
