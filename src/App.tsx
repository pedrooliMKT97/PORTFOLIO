import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ClientsTape } from './components/ClientsTape';
import { DesignSection } from './components/DesignSection';
import { VideoSection } from './components/VideoSection';
import { BrandingSection } from './components/BrandingSection';
import { Marketing360Section } from './components/Marketing360Section';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';
import Lenis from 'lenis';

// Variantes suaves de animação bidirecional (aparece ao rolar para baixo e para cima)
const revealVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function App() {
  // Inicialização do Lenis otimizada para rolagem 100% fluida, suave e consistente
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Permite rolagem nativa perfeitamente fluida no touch e trackpad
      wheelMultiplier: 0.9, // Controle de velocidade ideal sem arrancadas
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafd] text-[#0d1b3d] flex flex-col font-sans selection:bg-[#0057ff] selection:text-white">
      {/* Floating Centered Glass Navigation */}
      <Navbar />

      {/* Main Content Flow with Smooth Non-blocking Reveal Animations */}
      <main className="flex-grow">
        {/* Hero Section - Apenas Logo com Zoom inicial e Shrink ao rolar */}
        <Hero />

        {/* Quem Sou Eu - Fundo Azul, Texto Branco e Foto adaptada */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AboutSection />
        </motion.div>

        {/* Faixa Azul Escuro de Clientes/Parceiros com Logos mc1 até mc16 (Rolagem Rápida) */}
        <ClientsTape />

        {/* Graphic Design Carousel (Molduras limpas para imagens) */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <DesignSection />
        </motion.div>

        {/* Audiovisual & 9:16 Video Reels */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <VideoSection />
        </motion.div>

        {/* Branding & Visual Identity (Molduras limpas para imagens) */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <BrandingSection />
        </motion.div>

        {/* Complete 360 Marketing with Clean Pillars */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Marketing360Section />
        </motion.div>

        {/* Direct Contact Section */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ContactSection />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
