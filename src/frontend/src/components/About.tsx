import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Layers, Palette } from 'lucide-react';

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
      icon: Target,
      title: 'Product Strategy',
      description: 'Solving business problems',
    },
    {
      icon: Layers,
      title: 'Design Systems',
      description: 'Building modular UI kits',
    },
    {
      icon: Palette,
      title: 'Visual Storytelling',
      description: 'Creating cohesive brand voices',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About <span className="animated-gradient-text">& Philosophy</span>
            </h2>
            <p className="text-xl sm:text-2xl text-teal-400 font-semibold max-w-3xl mx-auto leading-relaxed">
              Obsessed with finding the 'pain point' in a user's journey and fixing it with simple,
              elegant solutions.
            </p>
          </div>

          {/* Key Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="h-full glass-card group">
                  <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <point.icon className="w-8 h-8 text-teal-400 icon-pulse" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{point.title}</h3>
                    <p className="text-muted-foreground">{point.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Bio Section */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '450ms' }}>
            <Card className="glass-card">
              <CardContent className="p-8 sm:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden ring-4 ring-teal-500/20 hover:ring-teal-500/40 transition-all duration-300">
                      <img
                        src="/assets/generated/mukesh-profile.dim_400x400.png"
                        alt="Mukesh Kumar M"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                      From Engineering to Experience Design
                    </h3>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                      With a <span className="text-teal-400 font-semibold">B.E. in Mechanical Engineering</span> from{' '}
                      <span className="text-teal-400 font-semibold">PSNA College of Engineering and Technology</span>, I bring a unique analytical
                      perspective to UI/UX design. My engineering background enables me to approach
                      design challenges with systematic problem-solving, creating interfaces that are
                      not only beautiful but also functionally robust and user-centric. This blend of
                      technical understanding and creative design thinking allows me to bridge the gap
                      between what users need and what technology can deliver.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
