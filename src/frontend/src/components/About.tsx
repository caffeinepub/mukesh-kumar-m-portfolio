import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Target, Users, Zap } from 'lucide-react';

const About = () => {
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

  const keyPoints = [
    {
      icon: Sparkles,
      title: 'Creative Problem Solver',
      description: 'Transforming complex challenges into elegant, user-friendly solutions',
    },
    {
      icon: Target,
      title: 'Detail-Oriented',
      description: 'Obsessed with pixel-perfect designs and seamless user experiences',
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Putting users first through research, testing, and iteration',
    },
    {
      icon: Zap,
      title: 'Fast Learner',
      description: 'Constantly exploring new tools, trends, and technologies',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About <span className="animated-gradient-text">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Passionate designer with a love for creating meaningful experiences
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            {/* Profile Image */}
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-figma-500/20 to-coral-500/20 rounded-2xl blur-2xl" />
                <img
                  src="/assets/generated/mukesh-profile.dim_400x400.png"
                  alt="Mukesh Kumar M"
                  className="relative rounded-2xl w-full max-w-md mx-auto shadow-2xl border border-border/50"
                />
              </div>
            </div>

            {/* Bio Text */}
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a <span className="text-foreground font-semibold">UI/UX Designer</span> and{' '}
                  <span className="text-foreground font-semibold">Frontend Developer</span> with a passion
                  for creating beautiful, functional digital experiences.
                </p>
                <p>
                  With expertise in <span className="text-figma-400 font-semibold">design systems</span>,{' '}
                  <span className="text-coral-400 font-semibold">user research</span>, and{' '}
                  <span className="text-tangerine-400 font-semibold">modern web technologies</span>, I bridge
                  the gap between design and development.
                </p>
                <p>
                  My approach combines data-driven insights with creative thinking to deliver solutions that
                  not only look great but also solve real user problems.
                </p>
              </div>
            </div>
          </div>

          {/* Key Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <Card className="h-full glass-card group hover:-translate-y-2 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-figma-500/20 to-coral-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <point.icon className="w-6 h-6 text-figma-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-figma-400 transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
