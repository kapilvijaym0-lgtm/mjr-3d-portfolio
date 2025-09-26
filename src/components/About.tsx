import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Home, Lightbulb } from "lucide-react";
import mjrPortrait from "@/assets/mjr-portrait.jpg";

const About = () => {
  const achievements = [
    {
      icon: Award,
      number: "50+",
      title: "Awards Won",
      description: "Recognition for excellence in interior design"
    },
    {
      icon: Users,
      number: "200+",
      title: "Happy Clients",
      description: "Satisfied homeowners and businesses"
    },
    {
      icon: Home,
      number: "300+",
      title: "Projects Completed",
      description: "Residential and commercial spaces"
    },
    {
      icon: Lightbulb,
      number: "15+",
      title: "Years Experience",
      description: "Crafting beautiful interiors"
    }
  ];

  const services = [
    "Residential Interior Design",
    "Commercial Space Planning",
    "Custom Furniture Design",
    "Color Consultation",
    "Space Optimization",
    "Project Management"
  ];

  return (
    <section id="about" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Royal Interior Designer</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 15 years of experience in luxury interior design, Royal Interior Designer 
              has established itself as a premier studio creating sophisticated, personalized spaces that reflect 
              the unique lifestyle and personality of each client.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our design philosophy centers on the belief that great design should be both 
              beautiful and functional, creating environments that not only inspire but also 
              enhance daily life through thoughtful planning and exquisite attention to detail.
            </p>

            {/* Services */}
            <div className="mb-8">
              <h3 className="font-display text-2xl font-semibold mb-4">Services Offered</h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                    {service}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-4 shadow-card border-0 gradient-card">
                    <CardContent className="p-0">
                      <achievement.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                      <div className="font-display text-2xl font-bold text-primary mb-1">
                        {achievement.number}
                      </div>
                      <div className="font-medium text-sm text-foreground mb-1">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={mjrPortrait}
                alt="Royal Interior Designer Team"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating accent element */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-accent rounded-full shadow-glow animate-float"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="bg-primary text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-8 text-center">
              <blockquote className="font-display text-xl md:text-2xl font-medium mb-4">
                "Royal Interior Designer transformed our home into a masterpiece. Their attention to detail and 
                understanding of our vision was extraordinary. Every room feels like a work of art."
              </blockquote>
              <cite className="text-primary-foreground/80">
                — Sarah Johnson, Manhattan Penthouse
              </cite>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About;