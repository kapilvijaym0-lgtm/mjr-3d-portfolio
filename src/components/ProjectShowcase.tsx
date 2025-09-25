import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import projectBedroom from "@/assets/project-bedroom.jpg";
import projectKitchen from "@/assets/project-kitchen.jpg";
import heroInterior from "@/assets/hero-interior.jpg";

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Luxury Living",
    location: "Manhattan, NY",
    year: "2024",
    category: "Residential",
    description: "A sophisticated penthouse transformation featuring custom furniture and curated art pieces.",
    image: heroInterior,
    tags: ["Luxury", "Modern", "Custom Furniture"]
  },
  {
    id: 2,
    title: "Serene Bedroom Retreat",
    location: "Beverly Hills, CA",
    year: "2023",
    category: "Residential",
    description: "Creating a peaceful sanctuary with neutral tones and premium materials.",
    image: projectBedroom,
    tags: ["Minimalist", "Luxury", "Residential"]
  },
  {
    id: 3,
    title: "Culinary Excellence",
    location: "Greenwich, CT",
    year: "2023",
    category: "Kitchen Design",
    description: "A chef's dream kitchen combining functionality with timeless elegance.",
    image: projectKitchen,
    tags: ["Kitchen", "Modern", "Marble"]
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 border-0 gradient-card">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-4 left-4 bg-white text-charcoal">
            {project.category}
          </Badge>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {project.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {project.year}
            </div>
          </div>
          
          <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            className="group/btn p-0 h-auto text-accent hover:text-accent/80 font-medium"
          >
            View Project
            <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background to-soft-gray">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our portfolio of sophisticated interior designs, where luxury meets functionality 
            and every space tells a unique story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
          >
            View All Projects
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;