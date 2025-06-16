
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Eye, Users, Lock, ExternalLink } from "lucide-react";

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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Project Image */}
      <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Privacy Badge */}
        {project.isPrivate && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-500/20 text-red-200 border-red-500/30">
              <Lock className="w-3 h-3 mr-1" />
              Private
            </Badge>
          </div>
        )}

        {/* Quick Stats */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-3 text-white/80 text-sm">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{project.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{project.views}</span>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Author */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={project.author.avatar} />
            <AvatarFallback className="bg-purple-500 text-white text-sm">
              {project.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-medium text-sm">{project.author.name}</p>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="border-white/30 text-white/80 text-xs hover:bg-white/10"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="border-white/30 text-white/60 text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-1 text-white/60 text-sm">
            <Users className="w-4 h-4" />
            <span>{project.collaborators} collaborator{project.collaborators !== 1 ? 's' : ''}</span>
          </div>
          
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
