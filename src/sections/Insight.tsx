import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Insight() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Visual animation
      gsap.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Orbit animation continuous
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 30,
          ease: 'none',
          repeat: -1
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="insight"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <h2 className="section-title mb-8">The Core Insight</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
                  Experts as Geometric Orbits
                </h3>
                <p className="body-text">
                  Instead of treating experts as independent parameter sets, 
                  ButterflyMoE views them as <span className="highlight-text">different geometric transformations</span> of a single, shared capacity.
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
                  A Single Lens, Many Views
                </h3>
                <p className="body-text">
                  Imagine holding a prism to light. One physical object, rotated 
                  slightly, reveals entirely different spectra. The prism doesn't 
                  change — your <span className="highlight-text">perspective</span> does.
                </p>
              </div>

              <div className="glass-panel rounded-xl p-6 mt-8">
                <p className="text-lg text-white/80 italic">
                  "The substrate remains constant. The rotation defines the expert."
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div ref={visualRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Central substrate */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border border-white/20 bg-white/[0.02] flex items-center justify-center relative">
                  <img
                    src="/geometric-orbits.jpg"
                    alt="Geometric orbits visualization"
                    className="w-full h-full object-cover rounded-2xl opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-white/60 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      Shared Substrate
                    </span>
                  </div>
                </div>
              </div>

              {/* Orbiting experts */}
              <div ref={orbitRef} className="absolute inset-0">
                {/* Expert 1 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                  <div className="glass-panel rounded-lg px-4 py-2 text-sm font-medium">
                    Expert 1
                  </div>
                </div>
                
                {/* Expert 2 */}
                <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2">
                  <div className="glass-panel rounded-lg px-4 py-2 text-sm font-medium">
                    Expert 2
                  </div>
                </div>
                
                {/* Expert N */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                  <div className="glass-panel rounded-lg px-4 py-2 text-sm font-medium">
                    Expert N
                  </div>
                </div>
              </div>

              {/* Orbit paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <ellipse
                  cx="200"
                  cy="200"
                  rx="180"
                  ry="180"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                />
                <ellipse
                  cx="200"
                  cy="200"
                  rx="140"
                  ry="140"
                  fill="none"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                  strokeDasharray="4 12"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mathematical intuition */}
        <div className="mt-20 md:mt-32">
          <div className="glass-panel rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
              Mathematical Intuition
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="body-text mb-4">
                  Each expert weight matrix is generated on-the-fly:
                </p>
                <div className="font-mono text-lg md:text-xl text-center p-6 bg-black/30 rounded-lg">
                  <span className="text-white/80">W</span>
                  <sub className="text-white/60 text-sm">i</sub>
                  <span className="text-white/80"> = B(φ</span>
                  <sub className="text-white/60 text-sm">i</sub>
                  <span className="text-white/80">) · W</span>
                  <sub className="text-white/60 text-sm">base</sub>
                  <span className="text-white/80"> · B(θ</span>
                  <sub className="text-white/60 text-sm">i</sub>
                  <span className="text-white/80">)</span>
                  <sup className="text-white/60 text-sm">T</sup>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/70">W<sub className="text-xs">base</sub> is shared across all experts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/70">B(θ) are lightweight Butterfly matrices</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/70">Only O(d log d) parameters per rotation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="text-white/70">Experts are never explicitly stored</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
