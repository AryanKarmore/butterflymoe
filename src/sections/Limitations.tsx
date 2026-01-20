import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Code, Scale, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const limitations = [
  {
    icon: Clock,
    title: 'Inference Speed',
    description: 'On-the-fly expert synthesis adds computational overhead. Each forward pass requires matrix multiplications with Butterfly transformations, resulting in ~1.5-2× slower inference compared to standard MoE.',
    currentStatus: '1.5-2× slower inference',
    mitigation: 'Hardware-specific kernels can reduce this to ~1.2×'
  },
  {
    icon: Code,
    title: 'Kernel Support',
    description: 'Efficient deployment requires custom CUDA/Triton kernels for Butterfly matrix operations. Standard deep learning frameworks lack optimized implementations for ternary-quantized Butterfly transforms.',
    currentStatus: 'Custom kernels required',
    mitigation: 'Reference implementations provided; community contributions welcome'
  },
  {
    icon: Scale,
    title: 'Current Scale Limits',
    description: 'ButterflyMoE has been validated up to ~1B parameter models. Scaling to larger models (10B+) requires further investigation of numerical stability and training dynamics.',
    currentStatus: 'Validated to 1B parameters',
    mitigation: 'Active research on scaling laws and stability improvements'
  },
  {
    icon: Zap,
    title: 'Training Complexity',
    description: 'Training requires careful initialization and learning rate scheduling for the rotation parameters. The joint optimization of base weights and rotations is more complex than standard MoE training.',
    currentStatus: 'More complex training',
    mitigation: 'Training recipes and hyperparameter guidelines provided'
  }
];

export default function Limitations() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="limitations"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <h2 className="section-title mb-6">Limitations</h2>
          <p className="body-text max-w-3xl">
            ButterflyMoE is a research prototype with known limitations. 
            We believe in transparent reporting of both strengths and weaknesses.
          </p>
        </div>

        {/* Limitation Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {limitations.map((limitation) => {
            const Icon = limitation.icon;
            return (
              <div
                key={limitation.title}
                className="glass-panel rounded-xl p-6 md:p-8 group hover:border-white/15 transition-all duration-300"
                style={{ opacity: 0 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{limitation.title}</h3>
                    <span className="text-sm text-white/50 bg-white/5 px-2 py-1 rounded">
                      {limitation.currentStatus}
                    </span>
                  </div>
                </div>

                <p className="body-text mb-6">{limitation.description}</p>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-sm text-white/50 mb-2">Mitigation</p>
                  <p className="text-sm text-white/70">{limitation.mitigation}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <div className="glass-panel rounded-xl p-8 max-w-3xl mx-auto">
            <p className="text-lg text-white/80">
              These limitations are not fundamental barriers but engineering challenges. 
              We are actively working on addressing each of them and welcome{' '}
              <span className="highlight-text">community contributions</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
