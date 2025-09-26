import Navigation from "@/components/Navigation";
import Hero3D from "@/components/Hero3D";
import ProjectShowcase from "@/components/ProjectShowcase";
import InteractiveShowroom from "@/components/InteractiveShowroom";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero3D />
      <ProjectShowcase />
      <InteractiveShowroom />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
