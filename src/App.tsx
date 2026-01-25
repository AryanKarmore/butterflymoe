import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Insight from './sections/Insight';
import HowItWorks from './sections/HowItWorks';
import Quantization from './sections/Quantization';
import MemoryScaling from './sections/MemoryScaling';
import Results from './sections/Results';
import Comparison from './sections/Comparison';
import Limitations from './sections/Limitations';
import Takeaway from './sections/Takeaway';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <Problem />
        <Insight />
        <HowItWorks />
        <Quantization />
        <MemoryScaling />
        <Results />
        <Comparison />
        <Limitations />
        <Takeaway />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              ButterflyMoE: Sub-Linear Mixture of Experts via Structured Rotations
            </p>
            <p className="text-white/30 text-sm">
              Research Project 2025
            </p>
          </div>
        </div>
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
