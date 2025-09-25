import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Center } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import heroInterior from "@/assets/hero-interior.jpg";

// Floating geometric shapes for visual interest
const FloatingGeometry = ({ position, geometry, color }: { position: [number, number, number], geometry: THREE.BufferGeometry, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      
      {/* Floating geometric elements */}
      <FloatingGeometry 
        position={[-2, 1, 0]} 
        geometry={new THREE.BoxGeometry(0.5, 0.5, 0.5)} 
        color="#D4AF37" 
      />
      <FloatingGeometry 
        position={[2, -1, -1]} 
        geometry={new THREE.ConeGeometry(0.3, 0.8, 6)} 
        color="#8B7355" 
      />
      <FloatingGeometry 
        position={[0, 2, -2]} 
        geometry={new THREE.OctahedronGeometry(0.4)} 
        color="#F5E6D3" 
      />
      
      {/* 3D Text */}
      <Center>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text3D
            font="/fonts/Playfair_Display_Regular.json"
            size={0.5}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[0, 0, 0]}
          >
            Interior Design
            <meshStandardMaterial color="#2D3748" />
          </Text3D>
        </Float>
      </Center>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};

const Hero3D = () => {
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
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Scene3D />
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