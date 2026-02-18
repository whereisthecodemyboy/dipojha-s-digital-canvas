import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'AURORA',
    category: 'Web Experience',
    description: 'An immersive 3D web experience for a luxury brand, featuring real-time lighting and spatial audio.',
    year: '2024',
    color: 'hsl(255, 100%, 65%)',
  },
  {
    title: 'NEXUS',
    category: 'Platform Design',
    description: 'A next-generation collaboration platform with fluid interfaces and AI-powered workflows.',
    year: '2024',
    color: 'hsl(200, 100%, 60%)',
  },
  {
    title: 'PRISM',
    category: 'Creative Direction',
    description: 'Brand identity and digital presence for an architectural studio, blending physical and digital space.',
    year: '2023',
    color: 'hsl(340, 100%, 60%)',
  },
  {
    title: 'ECHO',
    category: 'Interactive Art',
    description: 'A generative art installation translating sound waves into visual compositions in real-time.',
    year: '2023',
    color: 'hsl(160, 100%, 50%)',
  },
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(projects.length - 1) * 100}%`]);

  return (
    <section id="projects" ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Section label */}
        <motion.div
          className="absolute top-12 left-6 md:left-12 lg:left-24 z-10 flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="section-line" />
          <span className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Selected Work
          </span>
        </motion.div>

        {/* Counter */}
        <motion.div
          className="absolute top-12 right-6 md:right-12 lg:right-24 z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground">
            {projects.length} Projects
          </span>
        </motion.div>

        {/* Horizontal scroll container */}
        <motion.div className="flex h-full" style={{ x }}>
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-20 lg:px-32"
            >
              <motion.div
                className="relative w-full max-w-6xl"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Large ghost number */}
                <span
                  className="font-display font-bold absolute -top-20 md:-top-32 left-0 opacity-[0.03] leading-none select-none pointer-events-none"
                  style={{ color: project.color, fontSize: 'clamp(8rem, 20vw, 18rem)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Project image */}
                <div
                  className="w-full rounded-xl mb-10 overflow-hidden relative group"
                  style={{
                    aspectRatio: '16/9',
                    background: `linear-gradient(135deg, hsl(240 8% 12%), hsl(240 8% 8%))`,
                  }}
                >
                  {/* Color glow */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse at 35% 50%, ${project.color}, transparent 65%)`,
                      opacity: 0.15,
                    }}
                    whileHover={{ opacity: 0.35 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Center title watermark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-display font-bold opacity-[0.06] select-none"
                      style={{ color: project.color, fontSize: 'clamp(4rem, 12vw, 10rem)' }}
                    >
                      {project.title}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <span className="font-display text-base tracking-[0.4em] uppercase text-primary border border-primary/30 px-8 py-3">
                      View Project →
                    </span>
                  </motion.div>

                  {/* Top-left category tag */}
                  <div className="absolute top-6 left-6">
                    <span
                      className="font-body text-xs tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border"
                      style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}10` }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-6 right-6">
                    <span className="font-display text-sm text-muted-foreground">{project.year}</span>
                  </div>
                </div>

                {/* Project info row */}
                <div className="flex items-end justify-between gap-8">
                  <div>
                    <h3
                      className="font-display font-bold text-foreground mb-3 leading-none"
                      style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed max-w-xl" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Index indicator */}
                  <div className="flex-shrink-0 text-right">
                    <span
                      className="font-display font-bold opacity-20 leading-none"
                      style={{ color: project.color, fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-muted-foreground block text-xs tracking-widest opacity-50">
                      / {String(projects.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24">
          <div className="h-px bg-border">
            <motion.div
              className="h-full bg-primary"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
