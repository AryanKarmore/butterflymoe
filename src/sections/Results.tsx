import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, MemoryStick, Smartphone, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const edgeDevices = [
  { name: 'Raspberry Pi 5', ram: '8GB', standardMoe: 63, butterflyMoe: 21079 },
  { name: 'Jetson Nano', ram: '4GB', standardMoe: 31, butterflyMoe: 10540 },
  { name: 'ESP32-S3', ram: '512KB', standardMoe: 0, butterflyMoe: 131 }
];

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate from 0 to value
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setDisplayValue(Math.floor(value * easeOut));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);

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

      // Metrics animation
      gsap.fromTo(
        metricsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Devices animation
      gsap.fromTo(
        devicesRef.current?.children || [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: devicesRef.current,
            start: 'top 80%',
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
      id="results"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="section-title mb-6">Results</h2>
          <p className="body-text max-w-3xl">
            ButterflyMoE achieves unprecedented compression ratios while enabling 
            deployment scenarios that were previously impossible.
          </p>
        </div>

        {/* Key Metrics */}
        <div ref={metricsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="glass-panel rounded-2xl p-6 md:p-8 text-center group hover:border-white/20 transition-all duration-300" style={{ opacity: 0 }}>
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
              <Cpu className="w-7 h-7 text-white/80" />
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedNumber value={150} suffix="×" />
            </div>
            <p className="text-white/60 text-sm">Compression Ratio</p>
            <p className="text-xs text-white/40 mt-2">At 256 experts (d=512)</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8 text-center group hover:border-white/20 transition-all duration-300" style={{ opacity: 0 }}>
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
              <MemoryStick className="w-7 h-7 text-white/80" />
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedNumber value={1.9} suffix=" MB" />
            </div>
            <p className="text-white/60 text-sm">Memory for 64 Experts</p>
            <p className="text-xs text-white/40 mt-2">vs 256 MB standard</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8 text-center group hover:border-white/20 transition-all duration-300" style={{ opacity: 0 }}>
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
              <Smartphone className="w-7 h-7 text-white/80" />
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedNumber value={21000} suffix="+" />
            </div>
            <p className="text-white/60 text-sm">Experts on RPi 5</p>
            <p className="text-xs text-white/40 mt-2">Within 8GB RAM budget</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8 text-center group hover:border-white/20 transition-all duration-300" style={{ opacity: 0 }}>
            <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
              <Server className="w-7 h-7 text-white/80" />
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedNumber value={131} />
            </div>
            <p className="text-white/60 text-sm">Experts on ESP32</p>
            <p className="text-xs text-white/40 mt-2">Previously impossible</p>
          </div>
        </div>

        {/* Edge Deployment Table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/5">
            <h3 className="text-xl md:text-2xl font-semibold flex items-center gap-3">
              <Smartphone className="w-6 h-6" />
              Edge Deployment Capacity
            </h3>
            <p className="text-white/60 text-sm mt-2">
              Maximum number of experts that can be deployed within device RAM constraints
            </p>
          </div>

          <div ref={devicesRef}>
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-4 text-sm text-white/50 border-b border-white/5">
              <div>Device</div>
              <div className="text-center">RAM</div>
              <div className="text-center">Standard MoE</div>
              <div className="text-center">ButterflyMoE</div>
            </div>

            {/* Rows */}
            {edgeDevices.map((device) => (
              <div
                key={device.name}
                className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{device.name}</span>
                </div>
                <div className="text-center text-white/60">{device.ram}</div>
                <div className="text-center">
                  <span className={`font-mono ${device.standardMoe === 0 ? 'text-red-400' : 'text-white/60'}`}>
                    {device.standardMoe === 0 ? '—' : device.standardMoe}
                  </span>
                </div>
                <div className="text-center">
                  <span className="font-mono text-green-400 font-semibold">
                    {device.butterflyMoe.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What becomes possible */}
        <div className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            What Becomes Possible
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">64</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Massive Models on Mobile</h4>
              <p className="text-sm text-white/60">
                Deploy 64-expert models on smartphones and tablets with under 2MB memory footprint.
              </p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1000+</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Ultra-Dense Experts</h4>
              <p className="text-sm text-white/60">
                Models with thousands of experts become practical for the first time on edge hardware.
              </p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">IoT</span>
              </div>
              <h4 className="text-lg font-semibold mb-3">Intelligence Everywhere</h4>
              <p className="text-sm text-white/60">
                Bring sophisticated language models to microcontrollers and embedded systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
