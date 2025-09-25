import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@mjrinteriors.com", label: "Email" },
    { icon: Phone, href: "tel:+15551234567", label: "Phone" }
  ];

  const footerLinks = [
    { title: "Services", href: "#about" },
    { title: "Projects", href: "#projects" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl font-bold mb-4 text-gradient">MJR</h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Creating sophisticated, personalized interiors that enhance your lifestyle 
              and reflect your unique personality.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display text-xl font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-left text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.title}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display text-xl font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <p>123 Design District<br />New York, NY 10001</p>
              <p>hello@mjrinteriors.com</p>
              <p>+1 (555) 123-4567</p>
              <p className="text-sm mt-4">
                Monday - Friday<br />
                9:00 AM - 6:00 PM EST
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} MJR Interior Design. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;