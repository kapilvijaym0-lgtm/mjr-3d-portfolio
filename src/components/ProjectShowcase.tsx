import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Play } from "lucide-react";
import { Link } from "react-router-dom";
import * as THREE from "three";
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
  has3DWalkthrough?: boolean;
}

// 3D Model component for project cards
const Project3DPreview = ({ projectId }: { projectId: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  const getGeometry = () => {
    switch (projectId) {
      case 1:
        return <boxGeometry args={[1, 0.6, 0.8]} />;
      case 2:
        return <cylinderGeometry args={[0.5, 0.5, 0.8]} />;
      case 3:
        return <octahedronGeometry args={[0.5]} />;
      default:
        return <boxGeometry args={[1, 0.6, 0.8]} />;
    }
  };

  const getColor = () => {
    switch (projectId) {
      case 1:
        return "#D4AF37";
      case 2:
        return "#8B7355";
      case 3:
        return "#E6D7C3";
      default:
        return "#D4AF37";
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial 
          color={getColor()} 
          metalness={0.6} 
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Luxury Living",
    location: "Manhattan, NY",
    year: "2024",
    category: "Residential",
    description: "A sophisticated penthouse transformation featuring custom furniture and curated art pieces.",
    image: heroInterior,
    tags: ["Luxury", "Modern", "Custom Furniture"],
    has3DWalkthrough: true
  },
  {
    id: 2,
    title: "Serene Bedroom Retreat",
    location: "Beverly Hills, CA",
    year: "2023",
    category: "Residential",
    description: "Creating a peaceful sanctuary with neutral tones and premium materials.",
    image: projectBedroom,
    tags: ["Minimalist", "Luxury", "Residential"],
    has3DWalkthrough: true
  },
  {
    id: 3,
    title: "Culinary Excellence",
    location: "Greenwich, CT",
    year: "2023",
    category: "Kitchen Design",
    description: "A chef's dream kitchen combining functionality with timeless elegance.",
    image: projectKitchen,
    tags: ["Kitchen", "Modern", "Marble"],
    has3DWalkthrough: true
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
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-4 left-4 bg-white text-charcoal">
            {project.category}
          </Badge>
          {project.has3DWalkthrough && (
            <div className="absolute top-4 right-4 bg-accent text-white p-2 rounded-full">
              <Play size={14} />
            </div>
          )}
        </div>
        
        {/* 3D Preview Section */}
        <div className="h-32 bg-gradient-subtle">
          <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
            <Environment preset="studio" />
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 2]} intensity={0.8} />
            <Project3DPreview projectId={project.id} />
          </Canvas>
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
          
          <Link to={`/project/${project.id}`}>
            <Button 
              variant="ghost" 
              className="group/btn p-0 h-auto text-accent hover:text-accent/80 font-medium"
            >
              View Project
              <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
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
          <Link to="/projects">
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            >
              View All Projects
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;