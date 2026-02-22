import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, TrendingUp, Users, Target, BarChart } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const progress = Math.min(visibleHeight / elementHeight, 1);
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const experiences = [
    {
      icon: Briefcase,
      role: 'UI/UX Designer',
      company: 'Tech Innovations Ltd',
      period: '2022 - Present',
      description:
        'Leading design initiatives for enterprise SaaS products, creating design systems, and conducting user research.',
      achievements: [
        'Redesigned core product, increasing user satisfaction by 40%',
        'Built comprehensive design system used across 5 products',
        'Led UX research initiatives with 200+ user interviews',
      ],
    },
    {
      icon: Users,
      role: 'Product Designer',
      company: 'Digital Solutions Inc',
      period: '2020 - 2022',
      description:
        'Designed user-centric interfaces for mobile and web applications, collaborating with cross-functional teams.',
      achievements: [
        'Improved conversion rates by 35% through A/B testing',
        'Designed 3 successful mobile apps with 100K+ downloads',
        'Mentored junior designers and established design processes',
      ],
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Work <span className="animated-gradient-text">Experience</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              My professional journey in design and development
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Enhanced Animated Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block">
              <div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-figma-500 via-coral-500 to-tangerine-500 transition-all duration-300"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Experience Cards */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  {/* Enhanced Timeline Dot */}
                  <div className="absolute left-8 top-8 w-4 h-4 rounded-full bg-gradient-to-br from-figma-500 to-coral-500 border-4 border-background hidden md:block transform -translate-x-1/2 z-10 shadow-glow-sm" />

                  {/* Content */}
                  <div className="md:ml-20">
                    <Card className="glass-card group hover:-translate-y-2 transition-all duration-300">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-figma-500/25 to-coral-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <exp.icon className="w-6 h-6 text-figma-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-figma-400 transition-colors mb-1">
                              {exp.role}
                            </h3>
                            <p className="text-base sm:text-lg text-muted-foreground font-medium">
                              {exp.company}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div
                              key={achIndex}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-figma-400 mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
