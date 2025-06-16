
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { X, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [lookingForCollaborators, setLookingForCollaborators] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          creator_id: user.id,
          title,
          description,
          tech_stack: techStack,
          image_url: imageUrl || null,
          demo_url: demoUrl || null,
          github_url: githubUrl || null,
          is_private: isPrivate,
          looking_for_collaborators: lookingForCollaborators,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Project created successfully",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl text-white mb-4">Please sign in to create a project</h1>
          <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-purple-500 to-blue-500">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto bg-white/10 border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Project Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  placeholder="Describe your project..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Tech Stack</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60"
                    placeholder="Add technology"
                  />
                  <Button type="button" onClick={addTech} size="icon" className="bg-white/20 hover:bg-white/30">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-white/30 text-white/80">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(tech)}
                          className="ml-1 hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demoUrl" className="text-white">Demo URL</Label>
                  <Input
                    id="demoUrl"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl" className="text-white">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-white">Project Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="rounded border-white/20"
                  />
                  <span>Private Project</span>
                </label>

                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    checked={lookingForCollaborators}
                    onChange={(e) => setLookingForCollaborators(e.target.checked)}
                    className="rounded border-white/20"
                  />
                  <span>Looking for Collaborators</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProject;
