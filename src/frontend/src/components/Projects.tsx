import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, index, isVisible }: { project: any; index: number; isVisible: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [spotlightStyle, setSpotlightStyle] = useState({});

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out',
      });

      const spotlightColor = 'rgba(168, 85, 247, 0.18)';
      setSpotlightStyle({
        background: `radial-gradient(circle 300px at ${x}px ${y}px, ${spotlightColor}, transparent)`,
      });
    };

    const handleMouseLeave = () => {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s ease-out',
      });
      setSpotlightStyle({});
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div ref={cardRef} className="h-full" style={tiltStyle}>
        <Card className="h-full glass-card group overflow-hidden relative">
          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={spotlightStyle}
          />

          {/* Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />

          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <CardTitle className="text-2xl sm:text-3xl font-bold group-hover:text-figma-400 transition-colors">
                {project.title}
              </CardTitle>
              <ExternalLink className="w-6 h-6 text-figma-400 flex-shrink-0 group-hover:scale-125 group-hover:rotate-45 transition-all duration-300" />
            </div>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, tagIndex: number) => (
                <Badge
                  key={tagIndex}
                  variant="secondary"
                  className="bg-figma-500/15 text-figma-400 border border-figma-500/30 hover:bg-figma-500/25 hover:scale-110 transition-all duration-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          {/* Enhanced Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-figma-500/25 to-coral-500/20 blur-xl" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: 'Hospital Management System',
      description:
        'Streamlined clinical workflows with persona-driven interfaces and a scalable design system.',
      tags: ['Dashboard Design', 'Healthcare UX', 'Data Visualization'],
      gradient: 'from-figma-500/25 to-coral-500/20',
    },
    {
      title: 'Tours and Travel Management System',
      description:
        'End-to-end travel platform with seamless booking, interactive itineraries, and a responsive engine.',
      tags: ['Booking Engine', 'Consumer App', 'Travel Tech'],
      gradient: 'from-coral-500/20 to-tangerine-500/18',
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Featured{' '}
              <span className="animated-gradient-text">
                Projects
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Transforming complex problems into intuitive experiences
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
