import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const paragraphs = [
  {
    text: "I don't just build websites. I craft digital narratives that blur the line between technology and art.",
    highlight: "digital narratives",
  },
  {
    text: "Based in Nepal, I work at the intersection of design engineering and creative development, pushing pixels until they feel alive.",
    highlight: "feel alive",
  },
  {
    text: "Every project is a new canvas. Every interaction, a conversation. I believe code should evoke emotion — not just function.",
    highlight: "evoke emotion",
  },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden" id="about">
      {/* Background element */}
      <motion.div
        className="absolute -right-32 top-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          y,
          background: 'radial-gradient(circle, hsl(255 100% 65%) 0%, transparent 70%)',
        }}
      />

      <div className="px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-6 mb-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-line" />
          <span className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground">
            About Me
          </span>
        </motion.div>

        {/* Story paragraphs */}
        <div className="space-y-24 md:space-y-32">
          {paragraphs.map((p, i) => (
            <motion.div
              key={i}
              className={`max-w-3xl ${i % 2 === 1 ? 'ml-auto' : ''}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-tight text-foreground">
                {p.text.split(p.highlight).map((part, j, arr) => (
                  <span key={j}>
                    {part}
                    {j < arr.length - 1 && (
                      <span className="text-primary font-medium italic">{p.highlight}</span>
                    )}
                  </span>
                ))}
              </p>
              <motion.div
                className="mt-6 section-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
