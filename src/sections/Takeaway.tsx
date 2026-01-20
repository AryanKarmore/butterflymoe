import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Takeaway() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Quote animation with word-by-word reveal
      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0.2, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quoteText = "Experts are not independent parameters. They are different views of shared capacity.";
  const words = quoteText.split(' ');

  return (
    <section
      ref={sectionRef}
      id="takeaway"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        <div ref={contentRef} className="max-w-5xl mx-auto text-center" style={{ opacity: 0 }}>
          {/* Section label */}
          <p className="text-sm text-white/40 uppercase tracking-widest mb-8">
            Closing Thought
          </p>

          {/* Main quote */}
          <blockquote
            ref={quoteRef}
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-12"
          >
            {words.map((word, index) => (
              <span key={index} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </blockquote>

          {/* Attribution */}
          <p className="text-lg text-white/50 mb-16">
            A new perspective on Mixture of Experts
          </p>

          {/* Key insights */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white/80">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Shared Substrate</h4>
              <p className="text-sm text-white/60">
                One ternary matrix, geometrically transformed
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white/80">∞</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Infinite Views</h4>
              <p className="text-sm text-white/60">
                Rotations create unlimited expert configurations
              </p>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white/80">0</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Zero Storage</h4>
              <p className="text-sm text-white/60">
                Experts exist only at inference time
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <p className="text-white/40 text-sm mb-4">
              Ready to explore ButterflyMoE?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="cta-button-primary">
                Get Started
              </button>
              <button className="cta-button">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
