import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/generated/hero-abstract.dim_1920x1080.png)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
      </div>

      {/* Floating UI Elements with Parallax */}
      <div
        className="absolute top-1/4 left-1/4 w-32 h-32 opacity-20 pointer-events-none hidden lg:block transition-transform duration-300"
        style={{
          transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 30}px)`,
        }}
      >
        <img
          src="/assets/generated/wireframe-float.dim_400x400.png"
          alt=""
          className="w-full h-full object-contain animate-float"
        />
      </div>

      <div
        className="absolute top-1/3 right-1/4 w-24 h-24 opacity-30 pointer-events-none hidden lg:block transition-transform duration-300"
        style={{
          transform: `translate(${-mousePosition.x * 40}px, ${-mousePosition.y * 25}px)`,
        }}
      >
        <img
          src="/assets/generated/figma-icon.dim_120x120.png"
          alt=""
          className="w-full h-full object-contain animate-float-delayed"
        />
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="animated-gradient-text">
                Designing Human-Centered
              </span>
              <br />
              <span className="text-foreground">Digital Experiences</span>
            </h1>
          </div>

          <p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            I am <span className="text-teal-400 font-semibold">Mukesh Kumar M</span>, a UI/UX
            Developer based in Chennai bridging the gap between psychology, design, and business
            strategy.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="magnetic-button bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-teal-500/50 transition-all duration-300 group hover:scale-105 active:scale-95"
            >
              View Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-2 border-teal-500/50 hover:border-teal-500 hover:bg-teal-500/10 px-8 py-6 text-base sm:text-lg rounded-xl transition-all duration-300 group hover:scale-105 active:scale-95"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        <div className="w-6 h-10 border-2 border-teal-500/50 rounded-full flex items-start justify-center p-2 animate-bounce-slow">
          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
