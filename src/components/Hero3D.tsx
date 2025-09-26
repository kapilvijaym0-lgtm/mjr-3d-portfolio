import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Box, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import heroInterior from "@/assets/hero-interior.jpg";

// Interactive 3D scene that responds to mouse movement
const InteractiveScene = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire scene based on mouse position
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating interior design elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Box position={[-3, 1, -1]} args={[0.8, 0.1, 1.2]}>
          <meshStandardMaterial color="#8B7355" />
        </Box>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere position={[2, -1, 0]} args={[0.4]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <Box position={[0, 2, -2]} args={[0.6, 0.6, 0.1]}>
          <meshStandardMaterial color="#F5E6D3" />
        </Box>
      </Float>
      
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[-1, -0.5, 1]}>
          <cylinderGeometry args={[0.3, 0.3, 1.2, 6]} />
          <meshStandardMaterial color="#E6D7C3" />
        </mesh>
      </Float>
      
      <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.8}>
        <mesh position={[1.5, 0.8, 0.5]}>
          <tetrahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.6} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

const Scene3D = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#D4AF37" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8B7355" />
      <directionalLight position={[0, 10, 5]} intensity={1.5} />
      
      <InteractiveScene mousePosition={mousePosition} />
      
      {/* Subtle auto-rotation disabled to focus on mouse interaction */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false}
        autoRotate={false}
      />
    </>
  );
};

const Hero3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${heroInterior})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 cursor-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene3D mousePosition={mousePosition} />
        </Canvas>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Sophisticated Spaces,<br />
            <span className="text-gradient">Timeless Design</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl mb-8 font-light opacity-90 max-w-2xl mx-auto"
          >
            Creating luxurious, personalized interiors that reflect your unique style and enhance your daily life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="bg-white text-charcoal hover:bg-cream text-lg px-8 py-3 shadow-elegant"
            >
              Explore Projects
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-charcoal text-lg px-8 py-3"
              onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;