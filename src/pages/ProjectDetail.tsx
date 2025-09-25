import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import projectBedroom from "@/assets/project-bedroom.jpg";
import projectKitchen from "@/assets/project-kitchen.jpg";
import heroInterior from "@/assets/hero-interior.jpg";

const projects = [
  {
    id: 1,
    title: "Modern Luxury Living",
    location: "Manhattan, NY",
    year: "2024",
    category: "Residential",
    description: "A sophisticated penthouse transformation featuring custom furniture and curated art pieces.",
    fullDescription: "This stunning penthouse transformation in the heart of Manhattan showcases our commitment to luxury and sophistication. The project involved a complete redesign of the living spaces, incorporating custom-designed furniture pieces and carefully curated art collections. The neutral color palette creates a serene atmosphere while premium materials add texture and depth throughout the space.",
    image: heroInterior,
    tags: ["Luxury", "Modern", "Custom Furniture"],
    details: {
      client: "Private Residential",
      duration: "6 months",
      size: "3,500 sq ft",
      services: ["Interior Design", "Custom Furniture", "Art Curation", "Project Management"]
    }
  },
  {
    id: 2,
    title: "Serene Bedroom Retreat",
    location: "Beverly Hills, CA", 
    year: "2023",
    category: "Residential",
    description: "Creating a peaceful sanctuary with neutral tones and premium materials.",
    fullDescription: "This bedroom retreat in Beverly Hills was designed as a tranquil escape from the bustling city life. We focused on creating a serene atmosphere using a carefully selected palette of neutral tones, premium natural materials, and soft textures. The space features custom millwork, luxury bedding, and thoughtfully placed lighting to create the perfect environment for rest and relaxation.",
    image: projectBedroom,
    tags: ["Minimalist", "Luxury", "Residential"],
    details: {
      client: "Private Residential",
      duration: "3 months", 
      size: "800 sq ft",
      services: ["Interior Design", "Custom Millwork", "Lighting Design", "Styling"]
    }
  },
  {
    id: 3,
    title: "Culinary Excellence",
    location: "Greenwich, CT",
    year: "2023", 
    category: "Kitchen Design",
    description: "A chef's dream kitchen combining functionality with timeless elegance.",
    fullDescription: "This Greenwich kitchen renovation was designed for a professional chef who demanded both exceptional functionality and timeless elegance. The design features premium marble surfaces, state-of-the-art appliances, and custom cabinetry that maximizes storage while maintaining clean lines. The island serves as both a prep space and casual dining area, perfect for entertaining.",
    image: projectKitchen,
    tags: ["Kitchen", "Modern", "Marble"],
    details: {
      client: "Private Residential",
      duration: "4 months",
      size: "600 sq ft", 
      services: ["Kitchen Design", "Custom Cabinetry", "Appliance Selection", "Project Management"]
    }
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = parseInt(id || "0");
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gradient-to-b from-background to-soft-gray">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="relative overflow-hidden rounded-lg shadow-elegant mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-96 object-cover"
                  />
                  <Badge className="absolute top-6 left-6 bg-white text-charcoal">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {project.year}
                  </div>
                </div>

                <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  {project.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {project.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="mb-8">
                  <Share2 size={16} className="mr-2" />
                  Share Project
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-card p-6 rounded-lg shadow-card">
                <h3 className="font-semibold text-accent mb-2">Client</h3>
                <p className="text-muted-foreground">{project.details.client}</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-card">
                <h3 className="font-semibold text-accent mb-2">Duration</h3>
                <p className="text-muted-foreground">{project.details.duration}</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-card">
                <h3 className="font-semibold text-accent mb-2">Size</h3>
                <p className="text-muted-foreground">{project.details.size}</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-card">
                <h3 className="font-semibold text-accent mb-2">Services</h3>
                <div className="space-y-1">
                  {project.details.services.map((service, index) => (
                    <p key={index} className="text-sm text-muted-foreground">{service}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/contact">
                <Button size="lg" className="px-8">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;