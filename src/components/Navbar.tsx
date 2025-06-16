
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, Plus, Users, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              DevCollab
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-white/80 hover:text-white transition-colors flex items-center space-x-2"
            >
              <Code className="w-4 h-4" />
              <span>Projects</span>
            </button>
            <button
              onClick={() => navigate('/developers')}
              className="text-white/80 hover:text-white transition-colors flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Developers</span>
            </button>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Create Dropdown */}
                <div className="relative group">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create</span>
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-slate-900/95 backdrop-blur-md rounded-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={() => navigate('/create-project')}
                      className="block w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      New Project
                    </button>
                    <button
                      onClick={() => navigate('/create-team')}
                      className="block w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      New Team
                    </button>
                  </div>
                </div>

                {/* User Menu */}
                <div className="relative group">
                  <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-transparent group-hover:ring-purple-500 transition-all">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-purple-500 text-white text-sm">
                      {user.email?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-slate-900/95 backdrop-blur-md rounded-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-white text-sm font-medium">{user.email}</p>
                    </div>
                    <button
                      onClick={() => navigate('/profile')}
                      className="flex items-center w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {navigate('/'); setIsOpen(false);}}
                className="text-white/80 hover:text-white text-left"
              >
                Projects
              </button>
              <button
                onClick={() => {navigate('/developers'); setIsOpen(false);}}
                className="text-white/80 hover:text-white text-left"
              >
                Developers
              </button>
              {user && (
                <>
                  <button
                    onClick={() => {navigate('/create-project'); setIsOpen(false);}}
                    className="text-white/80 hover:text-white text-left"
                  >
                    Create Project
                  </button>
                  <button
                    onClick={() => {navigate('/create-team'); setIsOpen(false);}}
                    className="text-white/80 hover:text-white text-left"
                  >
                    Create Team
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
