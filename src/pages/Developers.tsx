
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Search, MapPin, Globe, Github, Linkedin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

interface Developer {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  location: string;
  website: string;
  github_url: string;
  linkedin_url: string;
  skills: string[];
  experience_level: string;
  available_for_hire: boolean;
}

const Developers = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDevelopers(data || []);
    } catch (error) {
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDevelopers = developers.filter((dev) =>
    dev.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="text-white">Loading developers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Developers</span>
          </h1>
          <p className="text-white/70 text-xl">Connect with talented developers from around the world</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <Input
              type="text"
              placeholder="Search developers by name, skills, or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Create Profile Button */}
        {user && (
          <div className="text-center mb-8">
            <Button
              onClick={() => navigate('/profile/edit')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Update Your Profile
            </Button>
          </div>
        )}

        {/* Developers Grid */}
        {filteredDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer) => (
              <Card key={developer.id} className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={developer.avatar_url} />
                    <AvatarFallback className="bg-purple-500 text-white text-lg">
                      {developer.username?.substring(0, 2).toUpperCase() || 'DV'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-white">{developer.full_name || developer.username}</h3>
                  <p className="text-white/70">@{developer.username}</p>
                  {developer.available_for_hire && (
                    <Badge className="bg-green-500/20 text-green-200 border-green-500/30">
                      Available for hire
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {developer.bio && (
                    <p className="text-white/80 text-sm mb-4 line-clamp-3">{developer.bio}</p>
                  )}
                  
                  {developer.location && (
                    <div className="flex items-center text-white/70 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {developer.location}
                    </div>
                  )}

                  <div className="flex items-center text-white/70 text-sm mb-4">
                    <span className="capitalize">{developer.experience_level} Level</span>
                  </div>

                  {developer.skills && developer.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {developer.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="border-white/30 text-white/80 text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {developer.skills.length > 3 && (
                        <Badge variant="outline" className="border-white/30 text-white/60 text-xs">
                          +{developer.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex justify-center space-x-3">
                    {developer.website && (
                      <a href={developer.website} target="_blank" rel="noopener noreferrer" 
                         className="text-white/60 hover:text-white">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                    {developer.github_url && (
                      <a href={developer.github_url} target="_blank" rel="noopener noreferrer"
                         className="text-white/60 hover:text-white">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {developer.linkedin_url && (
                      <a href={developer.linkedin_url} target="_blank" rel="noopener noreferrer"
                         className="text-white/60 hover:text-white">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-2">No developers found</h3>
              <p className="text-white/70">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Developers;
