import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const methods = [
  {
    name: 'Standard MoE',
    memoryScaling: 'O(N · d²)',
    compressionRatio: '1.0×',
    memory64Experts: '256 MB',
    edgeDeployable: false,
    description: 'Baseline MoE with dense expert matrices'
  },
  {
    name: 'QMoE',
    memoryScaling: 'O(N · d²)',
    compressionRatio: '10-20×',
    memory64Experts: '13-26 MB',
    edgeDeployable: false,
    description: 'Quantization-only approach'
  },
  {
    name: 'MoQE (2-bit)',
    memoryScaling: 'O(N · d²)',
    compressionRatio: '5.0×',
    memory64Experts: '51 MB',
    edgeDeployable: false,
    description: 'Mixture of Quantized Experts'
  },
  {
    name: 'PuzzleMoE',
    memoryScaling: 'O(N · d²) reduced',
    compressionRatio: '2×',
    memory64Experts: '128 MB',
    edgeDeployable: false,
    description: 'Expert partitioning method'
  },
  {
    name: 'MC',
    memoryScaling: 'O(N · d²) reduced',
    compressionRatio: '4×',
    memory64Experts: '64 MB',
    edgeDeployable: false,
    description: 'Model compression technique'
  },
  {
    name: 'ButterflyMoE',
    memoryScaling: 'O(d² + N · d · log d)',
    compressionRatio: '150×',
    memory64Experts: '1.9 MB',
    edgeDeployable: true,
    description: 'Structural re-parameterization',
    highlighted: true
  }
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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

      // Table rows animation
      gsap.fromTo(
        tableRef.current?.querySelectorAll('.comparison-row') || [],
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: tableRef.current,
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
      id="comparison"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="section-title mb-6">Comparison to Prior Work</h2>
          <p className="body-text max-w-3xl">
            ButterflyMoE is not an incremental improvement — it represents a{' '}
            <span className="highlight-text">fundamental shift</span> in how we 
            think about expert capacity.
          </p>
        </div>

        {/* Comparison Table */}
        <div ref={tableRef} className="glass-panel rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="comparison-header">
            <div>Method</div>
            <div>Memory Scaling</div>
            <div className="text-center">Compression</div>
            <div className="text-center">Edge Deployable</div>
          </div>

          {/* Rows */}
          {methods.map((method) => (
            <div
              key={method.name}
              className={`comparison-row ${method.highlighted ? 'bg-white/[0.03]' : ''}`}
              style={{ opacity: 0 }}
            >
              <div>
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-white/50 mt-1">{method.description}</div>
              </div>
              <div>
                <code className="text-sm bg-white/5 px-2 py-1 rounded">
                  {method.memoryScaling}
                </code>
              </div>
              <div className="text-center">
                <span className={`font-mono font-semibold ${method.highlighted ? 'text-green-400' : 'text-white/60'}`}>
                  {method.compressionRatio}
                </span>
                <div className="text-xs text-white/40">{method.memory64Experts}</div>
              </div>
              <div className="text-center">
                {method.edgeDeployable ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                    No
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Key Differences */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-red-400/80">
              Prior Work (Cosmetic)
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  Quantization-only approaches keep the O(N · d²) complexity
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  Low-rank factorization loses model capacity
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  Pruning/merging reduces expert diversity
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  All methods treat experts as independent
                </span>
              </li>
            </ul>
          </div>

          <div className="glass-panel rounded-xl p-8 border-white/10">
            <h3 className="text-xl font-semibold mb-6 text-green-400">
              ButterflyMoE (Structural)
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  Changes the fundamental complexity to O(d² + N · d · log d)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  Preserves full model capacity through geometric transformations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  Maintains expert diversity through learned rotations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 mt-2 flex-shrink-0" />
                <span className="text-white/70">
                  Experts are different views of shared capacity
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom insight */}
        <div className="mt-16 text-center">
          <div className="glass-panel rounded-xl p-8 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-white/80">
              While prior methods apply <span className="text-white">cosmetic changes</span>{' '}
              to the MoE structure, ButterflyMoE performs{' '}
              <span className="highlight-text">structural rethinking</span> of what 
              an "expert" fundamentally means.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
