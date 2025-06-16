
import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  creator_id: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  tech_stack: string[];
  is_private: boolean;
  looking_for_collaborators: boolean;
  created_at: string;
  project_likes: { id: string }[];
  project_collaborators: { id: string }[];
}

interface ProjectGridProps {
  searchQuery: string;
  selectedTags: string[];
}

const ProjectGrid = ({ searchQuery, selectedTags }: ProjectGridProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:creator_id (username, avatar_url),
          project_likes (id),
          project_collaborators (id)
        `)
        .eq('is_private', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on search and tags
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.profiles?.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => project.tech_stack?.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Transform data to match ProjectCard interface
  const transformedProjects = filteredProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description || '',
    image: project.image_url || '/placeholder.svg',
    author: {
      name: project.profiles?.username || 'Unknown',
      avatar: project.profiles?.avatar_url || '/placeholder.svg'
    },
    tags: project.tech_stack || [],
    isPrivate: project.is_private,
    likes: project.project_likes?.length || 0,
    views: Math.floor(Math.random() * 1000) + 100, // Mock views for now
    collaborators: project.project_collaborators?.length || 0
  }));

  if (loading) {
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">Loading projects...</h3>
        </div>
      </div>
    );
  }

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
      {transformedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformedProjects.map((project, index) => (
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
