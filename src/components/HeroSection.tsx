import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroBackground from './HeroBackground';
import MagneticButton from './MagneticButton';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const words = ['Crafting', 'Digital', 'Experiences', 'That', 'Resonate'];
  const subtitle = "Developer · Designer · Creative Thinker";

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1400px] w-full">
        {/* Small intro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8"
        >
          Dip Ojha — Portfolio 2025
        </motion.p>

        {/* Main statement */}
        <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-8">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                className={`inline-block ${i === 2 ? 'text-primary' : 'text-foreground'}`}
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-body text-muted-foreground text-lg md:text-xl tracking-wide mb-12 max-w-xl"
        >
          {subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex gap-6 items-center"
        >
          <MagneticButton
            href="#projects"
            className="px-8 py-4 bg-primary text-primary-foreground font-display text-sm tracking-widest uppercase rounded-full animate-glow-pulse"
          >
            View Work
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-4 border border-border text-foreground font-display text-sm tracking-widest uppercase rounded-full hover:border-primary/50 transition-colors duration-500"
          >
            Get in Touch
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
