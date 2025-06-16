
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Where Developers
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Collaborate</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Showcase your projects, connect with talented developers, and build amazing things together. Join the community where code meets creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-3">
              Start Building
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-3">
              Explore Projects
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Showcase Projects</h3>
            <p className="text-white/70">Display your best work with beautiful project cards. Add tech stacks, descriptions, and live demos.</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Find Collaborators</h3>
            <p className="text-white/70">Connect with developers who share your passion. Search by skills, experience, and interests.</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Build Together</h3>
            <p className="text-white/70">Join teams, contribute to exciting projects, and create something amazing with fellow developers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
