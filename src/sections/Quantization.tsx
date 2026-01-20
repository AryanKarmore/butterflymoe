import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, AlertTriangle, CheckCircle, RotateCw, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Quantization() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<'before' | 'after' | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Before card animation
      gsap.fromTo(
        beforeRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: beforeRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // After card animation
      gsap.fromTo(
        afterRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: afterRef.current,
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
      id="quantization"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="section-title mb-6">Why Quantization Works Here</h2>
          <p className="body-text max-w-3xl">
            Extreme quantization typically fails due to activation outliers dominating 
            quantization errors. ButterflyMoE solves this through learned geometric alignment.
          </p>
        </div>

        {/* The Problem with Outliers */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            The Activation Outlier Problem
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="body-text">
                In neural networks, a small subset of activation values (outliers) 
                can be orders of magnitude larger than the majority. When quantizing 
                to low precision:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span className="text-white/70">
                    Outliers dominate the quantization range
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span className="text-white/70">
                    Small values get crushed to zero
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <span className="text-white/70">
                    Information loss becomes catastrophic
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="glass-panel rounded-xl p-6">
              <p className="text-sm text-white/50 mb-4 font-medium">
                Static methods fail because:
              </p>
              <div className="space-y-3 text-sm text-white/60">
                <p>• Clipping removes outlier information</p>
                <p>• Scaling doesn't fix the underlying distribution</p>
                <p>• Post-training methods can't adapt weights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before Training */}
          <div
            ref={beforeRef}
            className={`glass-panel rounded-2xl overflow-hidden transition-all duration-500 ${
              hoveredCard === 'before' ? 'border-white/20 scale-[1.02]' : ''
            }`}
            style={{ opacity: 0 }}
            onMouseEnter={() => setHoveredCard('before')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6 md:p-8 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold">Before Training</h4>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                  Untrained
                </span>
              </div>
              <p className="text-white/60 text-sm">
                Weight distribution spreads across [-4, +4], poorly aligned with ternary grid.
              </p>
            </div>
            
            <div className="relative aspect-[4/3] p-6">
              <img
                src="/dist-before.jpg"
                alt="Weight distribution before training"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            
            <div className="p-6 md:p-8 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">Quantization Error</span>
                <span className="text-2xl font-bold text-red-400">51.3%</span>
              </div>
              <p className="text-xs text-white/40 mt-2">
                Mean squared error between full-precision and quantized weights
              </p>
            </div>
          </div>

          {/* After Training */}
          <div
            ref={afterRef}
            className={`glass-panel rounded-2xl overflow-hidden transition-all duration-500 border-white/10 ${
              hoveredCard === 'after' ? 'border-white/30 scale-[1.02]' : ''
            }`}
            style={{ opacity: 0 }}
            onMouseEnter={() => setHoveredCard('after')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="p-6 md:p-8 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold">After Training</h4>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                  Learned Rotations
                </span>
              </div>
              <p className="text-white/60 text-sm">
                Weight distribution tightly clustered around {'{-1, 0, +1}'}, perfectly aligned.
              </p>
            </div>
            
            <div className="relative aspect-[4/3] p-6">
              <img
                src="/dist-after.jpg"
                alt="Weight distribution after training"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            
            <div className="p-6 md:p-8 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm">Quantization Error</span>
                <span className="text-2xl font-bold text-green-400">1.43%</span>
              </div>
              <p className="text-xs text-white/40 mt-2">
                <span className="text-green-400 font-medium">97.2% reduction</span> in quantization error
              </p>
            </div>
          </div>
        </div>

        {/* Why It Works */}
        <div className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            Why Learned Rotations Succeed
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Energy Redistribution</h4>
              <p className="text-sm text-white/60">
                Rotations redistribute activation energy across dimensions, 
                naturally suppressing outliers without clipping information.
              </p>
            </div>
            
            <div className="glass-panel rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                <RotateCw className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Dynamic Alignment</h4>
              <p className="text-sm text-white/60">
                Unlike static methods, rotations are learned during training 
                to specifically optimize for quantization stability.
              </p>
            </div>
            
            <div className="glass-panel rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold mb-3">Per-Expert Optimization</h4>
              <p className="text-sm text-white/60">
                Each expert learns its own optimal rotation, allowing 
                specialization for different activation patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="mt-16 text-center">
          <div className="glass-panel rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-white/80">
              This is <span className="highlight-text">dynamic, learned alignment</span>, 
              not static post-training tricks. The model learns to make itself 
              quantizable during training.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
