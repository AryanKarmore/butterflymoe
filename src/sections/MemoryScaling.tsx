import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Memory data for visualization
const memoryData = {
  standardMoe: [
    { experts: 2, memory: 8 },
    { experts: 4, memory: 16 },
    { experts: 8, memory: 32 },
    { experts: 16, memory: 64 },
    { experts: 32, memory: 128 },
    { experts: 64, memory: 256 },
    { experts: 128, memory: 512 },
    { experts: 256, memory: 1024 }
  ],
  butterflyMoe: [
    { experts: 2, memory: 0.25 },
    { experts: 4, memory: 0.30 },
    { experts: 8, memory: 0.40 },
    { experts: 16, memory: 0.61 },
    { experts: 32, memory: 1.03 },
    { experts: 64, memory: 1.85 },
    { experts: 128, memory: 3.51 },
    { experts: 256, memory: 6.82 }
  ]
};

export default function MemoryScaling() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ type: string; experts: number; memory: number } | null>(null);

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

      // Chart animation
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Generate SVG path for standard MoE (linear)
  const standardPath = memoryData.standardMoe
    .map((point, index) => {
      const x = 50 + (index / (memoryData.standardMoe.length - 1)) * 700;
      const y = 350 - (point.memory / 1024) * 300;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate SVG path for ButterflyMoE (sub-linear)
  const butterflyPath = memoryData.butterflyMoe
    .map((point, index) => {
      const x = 50 + (index / (memoryData.butterflyMoe.length - 1)) * 700;
      const y = 350 - (point.memory / 1024) * 300;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <section
      ref={sectionRef}
      id="memory-scaling"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="section-title mb-6">Memory Scaling</h2>
          <p className="body-text max-w-3xl">
            The key advantage of ButterflyMoE: compression ratio{' '}
            <span className="highlight-text">improves</span> as expert count increases.
          </p>
        </div>

        {/* Chart Container */}
        <div
          ref={chartRef}
          className="glass-panel rounded-2xl p-6 md:p-8 overflow-hidden"
          style={{ opacity: 0 }}
        >
          <div className="relative">
            {/* SVG Chart */}
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Axes */}
              <line x1="50" y1="350" x2="750" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="50" y1="50" x2="50" y2="350" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* Y-axis labels (Memory in MB) */}
              <text x="40" y="355" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="end">0</text>
              <text x="40" y="275" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="end">256</text>
              <text x="40" y="195" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="end">512</text>
              <text x="40" y="115" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="end">768</text>
              <text x="40" y="55" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="end">1024 MB</text>

              {/* X-axis labels (Number of experts) */}
              <text x="50" y="370" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">1</text>
              <text x="228" y="370" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">32</text>
              <text x="406" y="370" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">64</text>
              <text x="584" y="370" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">128</text>
              <text x="750" y="370" fill="rgba(255,255,255,0.5)" fontSize="12" textAnchor="middle">256</text>

              {/* Standard MoE line */}
              <path
                d={standardPath}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />

              {/* ButterflyMoE line */}
              <path
                d={butterflyPath}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />

              {/* Data points */}
              {memoryData.standardMoe.map((point, index) => {
                const x = 50 + (index / (memoryData.standardMoe.length - 1)) * 700;
                const y = 350 - (point.memory / 1024) * 300;
                return (
                  <circle
                    key={`standard-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#ef4444"
                    className="cursor-pointer transition-all duration-200 hover:r-6"
                    onMouseEnter={() => setHoveredPoint({ type: 'Standard MoE', experts: point.experts, memory: point.memory })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              })}

              {memoryData.butterflyMoe.map((point, index) => {
                const x = 50 + (index / (memoryData.butterflyMoe.length - 1)) * 700;
                const y = 350 - (point.memory / 1024) * 300;
                return (
                  <circle
                    key={`butterfly-${index}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#22c55e"
                    className="cursor-pointer transition-all duration-200 hover:r-6"
                    onMouseEnter={() => setHoveredPoint({ type: 'ButterflyMoE', experts: point.experts, memory: point.memory })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              })}

              {/* Legend */}
              <g transform="translate(550, 80)">
                <rect x="0" y="0" width="180" height="60" fill="rgba(0,0,0,0.5)" rx="8" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <circle cx="20" cy="20" r="4" fill="#ef4444" />
                <text x="30" y="24" fill="rgba(255,255,255,0.8)" fontSize="14">Standard MoE</text>
                <circle cx="20" cy="40" r="4" fill="#22c55e" />
                <text x="30" y="44" fill="rgba(255,255,255,0.8)" fontSize="14">ButterflyMoE</text>
              </g>
            </svg>

            {/* Hover tooltip */}
            {hoveredPoint && (
              <div className="absolute top-4 right-4 glass-panel rounded-lg p-4 pointer-events-none">
                <p className="text-sm font-medium">{hoveredPoint.type}</p>
                <p className="text-xs text-white/60">{hoveredPoint.experts} experts</p>
                <p className="text-lg font-bold">{hoveredPoint.memory.toFixed(1)} MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Compression ratio table */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Compression Ratio</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/60">16 experts</span>
                <span className="font-mono text-green-400">104.65×</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">64 experts</span>
                <span className="font-mono text-green-400">138.10×</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">256 experts</span>
                <span className="font-mono text-green-400">150.10×</span>
              </div>
            </div>
            <p className="text-xs text-white/40 mt-4">
              Compression improves with expert count
            </p>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Asymptotic Complexity</h4>
            <div className="space-y-4">
              <div>
                <span className="text-white/50 text-sm">Standard MoE</span>
                <p className="font-mono text-red-400">O(N · d²)</p>
              </div>
              <div>
                <span className="text-white/50 text-sm">ButterflyMoE</span>
                <p className="font-mono text-green-400">O(d² + N · d · log d)</p>
              </div>
            </div>
            <p className="text-xs text-white/40 mt-4">
              Sub-linear scaling in expert count N
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
