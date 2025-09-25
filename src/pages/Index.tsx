import Navigation from "@/components/Navigation";
import Hero3D from "@/components/Hero3D";
import ProjectShowcase from "@/components/ProjectShowcase";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero3D />
      <ProjectShowcase />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
