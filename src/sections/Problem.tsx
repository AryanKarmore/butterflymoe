import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const standardRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Standard MoE animation
      gsap.fromTo(
        standardRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: standardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // ButterflyMoE animation
      gsap.fromTo(
        butterflyRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: butterflyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Visual animation
      gsap.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="section-title mb-6">The Problem</h2>
          <p className="body-text max-w-2xl">
            Mixture of Experts architectures have become the standard for scaling 
            neural networks, but they carry a fundamental memory bottleneck that 
            prevents deployment on resource-constrained devices.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Standard MoE */}
          <div
            ref={standardRef}
            className="glass-panel rounded-2xl p-8 md:p-10 group hover:border-white/20 transition-all duration-500"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <h3 className="text-2xl md:text-3xl font-semibold">Standard MoE</h3>
            </div>
            
            <p className="body-text mb-8">
              Each expert is a dense weight matrix. Memory scales linearly with 
              the number of experts.
            </p>

            {/* Memory visualization */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-16">1 expert</span>
                <div className="flex-1 h-8 bg-white/10 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-500/10" />
                </div>
                <span className="text-sm text-white/60">4 MB</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-16">16 experts</span>
                <div className="flex-1 h-8 bg-white/10 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/40 to-red-500/15" />
                </div>
                <span className="text-sm text-white/60">64 MB</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-16">64 experts</span>
                <div className="flex-1 h-8 bg-white/10 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-red-500/20" />
                </div>
                <span className="text-sm text-white/60">256 MB</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-lg font-mono text-white/80">
                Memory: <span className="text-red-400">O(N · d²)</span>
              </p>
              <p className="text-sm text-white/40 mt-2">
                Linear scaling makes large expert counts impractical
              </p>
            </div>
          </div>

          {/* ButterflyMoE */}
          <div
            ref={butterflyRef}
            className="glass-panel rounded-2xl p-8 md:p-10 group hover:border-white/20 transition-all duration-500 border-white/10"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <h3 className="text-2xl md:text-3xl font-semibold">ButterflyMoE</h3>
            </div>
            
            <p className="body-text mb-8">
              Experts are geometric rotations of a shared substrate. Memory scales 
              sub-linearly with expert count.
            </p>

            {/* Memory visualization */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-16">1 expert</span>
                <div className="flex-1 h-8 bg-white/10 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-500/10" />
                </div>
                <span className="text-sm text-white/60">1.1 MB</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-16">16 experts</span>
                <div className="flex-1 h-8 bg-white/10 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-500/10" style={{ width: '35%' }} />
                </div>
                <span className="text-sm text-white/60">1.3 MB</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-16">64 experts</span>
                <div className="flex-1 h-8 bg-white/10 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-500/10" style={{ width: '40%' }} />
                </div>
                <span className="text-sm text-white/60">1.9 MB</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-lg font-mono text-white/80">
                Memory: <span className="text-green-400">O(d² + N · d · log d)</span>
              </p>
              <p className="text-sm text-white/40 mt-2">
                Sub-linear scaling enables massive expert counts
              </p>
            </div>
          </div>
        </div>

        {/* Visual comparison */}
        <div
          ref={visualRef}
          className="relative rounded-2xl overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/memory-compression.jpg"
            alt="Memory compression visualization"
            className="w-full h-auto rounded-2xl opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Key insight */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed">
            At 256 experts (d = 512), standard MoE requires{' '}
            <span className="text-red-400 font-semibold">~1 GB</span> of memory.{' '}
            ButterflyMoE needs only{' '}
            <span className="text-green-400 font-semibold">~4.7 MB</span> — a{' '}
            <span className="highlight-text text-2xl md:text-3xl">150× reduction</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
