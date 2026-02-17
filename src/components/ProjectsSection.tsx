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

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(projects.length - 1) * 50}%`]);

  return (
    <section id="projects" ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      {/* Section label */}
      <div className="sticky top-0 h-screen overflow-hidden">
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

        {/* Horizontal scroll container */}
        <motion.div className="flex h-full items-center" style={{ x }}>
          {projects.map((project, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[90vw] md:w-[50vw] h-full flex items-center px-6 md:px-16"
            >
              <motion.div
                className="relative w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Project number */}
                <span
                  className="font-display text-[8rem] md:text-[12rem] font-bold absolute -top-16 md:-top-24 -left-2 opacity-[0.04] leading-none select-none"
                  style={{ color: project.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Project image placeholder */}
                <div
                  className="w-full aspect-[16/10] rounded-lg mb-8 overflow-hidden relative group"
                  style={{
                    background: `linear-gradient(135deg, hsl(240 8% 12%), hsl(240 8% 8%))`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at 30% 50%, ${project.color}, transparent 60%)`,
                    }}
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl md:text-8xl font-bold opacity-10" style={{ color: project.color }}>
                      {project.title}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <span className="font-display text-sm tracking-[0.3em] uppercase text-primary">
                      View Project →
                    </span>
                  </motion.div>
                </div>

                {/* Project info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground tracking-wide mb-3">
                      {project.category}
                    </p>
                    <p className="font-body text-sm text-secondary-foreground/60 max-w-md leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <span className="font-display text-sm text-muted-foreground">{project.year}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24">
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
