import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, FileText, BarChart3, Code } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );

      // Description animation
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.7 }
      );

      // Badges animation
      gsap.fromTo(
        badgesRef.current?.children || [],
        { opacity: 0, scale: 0.8, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'back.out(1.7)', 
          stagger: 0.1,
          delay: 0.9 
        }
      );

      // Buttons animation
      gsap.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: 'power3.out', 
          stagger: 0.1,
          delay: 1.1 
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 10,
        y: (clientY / innerHeight - 0.5) * 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
            style={{ opacity: 0 }}
          >
            <span className="block">Butterfly</span>
            <span className="block text-gradient opacity-80">MoE</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-4 font-light"
            style={{ opacity: 0 }}
          >
            Sub-Linear Mixture of Experts
          </p>

          {/* Badges */}
          <div ref={badgesRef} className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="metric-badge">150× compression</span>
            <span className="metric-badge">Sub-linear MoE</span>
            <span className="metric-badge">Edge deployable</span>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base md:text-lg text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Standard MoE models scale memory linearly with expert count.{' '}
            <span className="highlight-text">ButterflyMoE breaks this barrier</span>{' '}
            by re-parameterizing experts as geometric rotations of a shared, 
            ternary-quantized substrate.
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="cta-button-primary flex items-center gap-2 group"
            >
              <FileText className="w-4 h-4" />
              Read Paper
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => scrollToSection('results')}
              className="cta-button flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              View Results
            </button>
            <button 
              onClick={() => scrollToSection('comparison')}
              className="cta-button flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Code
            </button>
          </div>
        </div>
      </div>

      {/* Breathing animation overlay */}
      <div className="absolute inset-0 animate-breathe pointer-events-none" />
    </section>
  );
}
