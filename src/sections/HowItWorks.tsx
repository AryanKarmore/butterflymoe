import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Grid3X3, RotateCw, Layers, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 'substrate',
    icon: Grid3X3,
    title: 'Shared Ternary Substrate',
    description: 'A single base matrix W_base is stored with ternary values {-1, 0, +1}. This matrix is shared across all experts and quantized to ~1.58 bits per weight.',
    image: '/ternary-substrate.jpg'
  },
  {
    id: 'rotations',
    icon: RotateCw,
    title: 'Butterfly Rotations',
    description: 'Each expert applies geometric rotations using lightweight Butterfly matrices B(θ_i) and B(φ_i). These require only O(d log d) parameters each.',
    image: '/butterfly-transform.jpg'
  },
  {
    id: 'synthesis',
    icon: Layers,
    title: 'On-the-Fly Synthesis',
    description: 'Expert matrices are generated dynamically during inference: W_i = B(φ_i) · W_base · B(θ_i)^T. No expert is ever stored in memory.',
    image: '/synthesis.jpg'
  },
  {
    id: 'routing',
    icon: GitBranch,
    title: 'Gated Routing',
    description: 'A standard gating mechanism selects which experts to activate for each token. The router operates on the synthesized expert outputs.',
    image: '/routing.jpg'
  }
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);

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

      // Step animations with scroll trigger
      stepRefs.current.forEach((stepRef, index) => {
        if (!stepRef) return;

        ScrollTrigger.create({
          trigger: stepRef,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index)
        });

        gsap.fromTo(
          stepRef,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepRef,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

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
            trigger: sectionRef.current,
            start: 'top 60%',
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
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="section-title mb-6">How It Works</h2>
          <p className="body-text max-w-3xl">
            ButterflyMoE reimagines the fundamental structure of Mixture of Experts 
            through four key innovations that work in concert.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`relative p-6 md:p-8 rounded-2xl transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'glass-panel border-white/20'
                      : 'bg-transparent border border-transparent hover:border-white/5'
                  }`}
                  style={{ opacity: 0 }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step number */}
                  <div className="absolute -left-3 top-6">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon and title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'bg-white/5 text-white/40'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3
                      className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-white/60'
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className={`body-text ml-13 transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Visual */}
          <div ref={visualRef} className="lg:sticky lg:top-32 h-fit" style={{ opacity: 0 }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel p-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`absolute inset-4 rounded-xl overflow-hidden transition-all duration-700 ${
                    activeStep === index
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95'
                  }`}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm font-medium text-white/80">
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}

              {/* Step indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-white w-6'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
