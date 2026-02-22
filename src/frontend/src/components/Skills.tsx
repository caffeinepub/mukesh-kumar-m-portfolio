import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Figma, Code2, Palette, Users, BarChart3 } from 'lucide-react';

const Skills = () => {
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

  const skills = [
    {
      icon: Figma,
      title: 'Design Tools',
      items: ['Figma', 'Adobe XD', 'Sketch', 'Illustrator'],
      span: 'md:col-span-2',
    },
    {
      icon: Code2,
      title: 'Development',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
      span: 'md:col-span-2',
    },
    {
      icon: Palette,
      title: 'UI Design',
      items: ['Design Systems', 'Prototyping', 'Wireframing'],
      span: 'md:col-span-2',
    },
    {
      icon: Users,
      title: 'UX Research',
      items: ['User Testing', 'Personas', 'Journey Maps'],
      span: 'md:col-span-1',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      items: ['A/B Testing', 'Heatmaps', 'User Metrics'],
      span: 'md:col-span-2',
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="animated-gradient-text">Expertise</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tools and technologies I work with
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`${skill.span} transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="h-full glass-card group hover:-translate-y-2 transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-figma-500/20 to-coral-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <skill.icon className="w-6 h-6 text-figma-400 icon-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-figma-400 transition-colors">
                      {skill.title}
                    </h3>
                    <ul className="space-y-2">
                      {skill.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-muted-foreground text-sm sm:text-base flex items-center gap-2 animate-fade-in-up"
                          style={{ animationDelay: `${(index * 150) + (itemIndex * 100)}ms` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-figma-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
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

export default Skills;
