import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Eye, Info } from "lucide-react";
import * as THREE from "three";

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  price?: string;
  material?: string;
}

const hotspots: Hotspot[] = [
  {
    id: "sofa",
    position: [-2, 0.5, 0],
    title: "Custom Velvet Sofa",
    description: "Handcrafted Italian velvet sofa with brass accents and premium cushioning.",
    price: "$12,500",
    material: "Italian Velvet, Brass"
  },
  {
    id: "coffee-table",
    position: [0, 0.2, 1],
    title: "Marble Coffee Table",
    description: "Carrara marble top with geometric brass base, showcasing modern luxury.",
    price: "$3,200",
    material: "Carrara Marble, Brass"
  },
  {
    id: "lighting",
    position: [1.5, 2, -1],
    title: "Designer Pendant Light",
    description: "Custom crystal chandelier with warm LED lighting and dimming controls.",
    price: "$5,800",
    material: "Crystal, LED"
  },
  {
    id: "artwork",
    position: [-1.5, 1.5, -2],
    title: "Abstract Wall Art",
    description: "Original commissioned artwork that complements the room's color palette.",
    price: "$2,400",
    material: "Canvas, Acrylic"
  }
];

const ShowroomModel = ({ onHotspotClick }: { onHotspotClick: (hotspot: Hotspot) => void }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Room Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#F5F5F0" />
      </mesh>

      {/* Sofa */}
      <mesh position={[-2, 0.5, 0]}>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Coffee Table */}
      <mesh position={[0, 0.2, 1]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Lamp */}
      <group position={[1.5, 2, -1]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      </group>

      {/* Wall Art */}
      <mesh position={[-1.5, 1.5, -2]}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial color="#E6D7C3" />
      </mesh>

      {/* Interactive Hotspots */}
      {hotspots.map((hotspot) => (
        <Html
          key={hotspot.id}
          position={hotspot.position}
          distanceFactor={10}
          occlude
        >
          <button
            onClick={() => onHotspotClick(hotspot)}
            className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg animate-pulse"
          >
            <Eye size={12} />
          </button>
        </Html>
      ))}

      <ContactShadows opacity={0.3} scale={8} blur={2} far={2} />
    </group>
  );
};

const InteractiveShowroom = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-soft-gray to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Interactive <span className="text-gradient">Showroom</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Explore our 3D showroom and click on the interactive hotspots to discover the stories behind each carefully curated piece.
          </p>
        </motion.div>

        <div className="relative">
          <div className="h-[600px] rounded-2xl overflow-hidden shadow-elegant bg-gradient-subtle">
            <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
              <Environment preset="apartment" />
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <ShowroomModel onHotspotClick={setSelectedHotspot} />
              <OrbitControls 
                enablePan={false} 
                maxPolarAngle={Math.PI / 2} 
                minDistance={3}
                maxDistance={8}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>

          {/* Hotspot Details Modal */}
          <AnimatePresence>
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedHotspot(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-md w-full"
                >
                  <Card className="shadow-elegant border-0 gradient-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <Info className="text-accent" size={20} />
                          <h3 className="font-display text-2xl font-semibold">
                            {selectedHotspot.title}
                          </h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedHotspot(null)}
                          className="text-muted-foreground"
                        >
                          <X size={18} />
                        </Button>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {selectedHotspot.description}
                      </p>
                      
                      <div className="space-y-2">
                        {selectedHotspot.price && (
                          <div className="flex justify-between">
                            <span className="font-medium">Price:</span>
                            <span className="text-accent font-semibold">{selectedHotspot.price}</span>
                          </div>
                        )}
                        {selectedHotspot.material && (
                          <div className="flex justify-between">
                            <span className="font-medium">Material:</span>
                            <span className="text-muted-foreground">{selectedHotspot.material}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full mt-6">
                        Request Information
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-muted-foreground"
        >
          <p>Click and drag to rotate • Scroll to zoom • Click hotspots to explore details</p>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveShowroom;