import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section ref={containerRef} id="contact" className="relative py-32 md:py-48 overflow-hidden">
      {/* Animated background ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 pointer-events-none"
        style={{ rotate, scale }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary/5 pointer-events-none"
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
      />

      {/* Gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, hsl(255 100% 65%), transparent 60%)' }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto text-center">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-line" />
          <span className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Let's Connect
          </span>
          <div className="section-line" style={{ transform: 'scaleX(-1)' }} />
        </motion.div>

        {/* Main CTA text */}
        <motion.h2
          className="font-display font-bold text-foreground mb-8 leading-[1.1]"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Have a project
          <br />
          in <span className="text-primary italic">mind</span>?
        </motion.h2>

        <motion.p
          className="font-body text-muted-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MagneticButton
            href="mailto:hello@dipojha.com.np"
            className="px-12 py-5 bg-primary text-primary-foreground font-display text-sm tracking-[0.3em] uppercase rounded-full animate-glow-pulse inline-block"
          >
            Say Hello
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-10 mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((link) => (
            <MagneticButton key={link} href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              {link}
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-32 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body text-xs text-muted-foreground">
            © 2025 Dip Ojha. All rights reserved.
          </span>
          <span className="font-body text-xs text-muted-foreground">
            Crafted with intention & code
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
