/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, lazy, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import LanguagePopup from './components/LanguagePopup';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center bg-dark text-white p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ops! Algo deu errado.</h2>
          <p className="text-white/60 mb-6">Ocorreu um erro inesperado. Por favor, recarregue a página.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary rounded-full font-semibold"
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Services = lazy(() => import('./components/Services'));
const Process = lazy(() => import('./components/Process'));
const DesignPortfolio = lazy(() => import('./components/DesignPortfolio'));
const IdentityPortfolio = lazy(() => import('./components/IdentityPortfolio'));
const VideoPortfolio = lazy(() => import('./components/VideoPortfolio'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const [languageSelected, setLanguageSelected] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('languageSelected');
    }
    return false;
  });

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-dark min-h-screen text-white selection:bg-primary selection:text-white">
        <CustomCursor />
        {!languageSelected ? (
          <LanguagePopup onSelect={() => setLanguageSelected(true)} />
        ) : (
          <>
            <Preloader />
            <ScrollProgress />
            <Navbar />
            
            <main>
              <Hero />
              <Suspense fallback={<div className="h-screen flex items-center justify-center bg-dark"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
                <Services />
                <Process />
                <DesignPortfolio />
                <IdentityPortfolio />
                <VideoPortfolio />
                <About />
                <Contact />
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
            <FloatingWhatsApp />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
