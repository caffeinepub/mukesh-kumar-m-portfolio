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

  const achievements = [
    {
      icon: Briefcase,
      text: 'Designed 5+ UI projects enhancing engagement',
    },
    {
      icon: Users,
      text: 'Managed UI/UX for 7 projects with high budgets',
    },
    {
      icon: TrendingUp,
      text: 'Improved usability scores significantly across 3 major applications',
    },
    {
      icon: BarChart,
      text: 'Reduced user drop-off rates via A/B testing',
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Professional{' '}
              <span className="animated-gradient-text">
                Experience
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">My journey in UI/UX development</p>
          </div>

          {/* Timeline */}
          <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
            {/* Animated Timeline Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-emerald-500 hidden sm:block origin-top transition-transform duration-300"
              style={{ transform: `scaleY(${scrollProgress})` }}
            />

            <Card className="glass-card group">
              <CardContent className="p-6 sm:p-8 md:p-10">
                {/* Company Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Target className="w-8 h-8 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">UI/UX Developer</h3>
                    <p className="text-teal-400 font-semibold text-lg mb-1">
                      Yoho Technologies Pvt Ltd
                    </p>
                    <p className="text-muted-foreground">April 2025 - Present</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-4 mt-8">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 group/item transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                      style={{ transitionDelay: `${400 + index * 150}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/10 to-emerald-500/10 flex items-center justify-center group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300">
                        <achievement.icon className="w-5 h-5 text-teal-400" />
                      </div>
                      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed pt-1.5">
                        {achievement.text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
