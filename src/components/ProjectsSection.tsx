import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'AURORA',
    category: 'Web Experience',
    description: 'An immersive 3D web experience for a luxury brand, featuring real-time lighting and spatial audio.',
    fullDescription: "Aurora was a ground-breaking digital experience commissioned by a high-end luxury brand. The project pushed the boundaries of what is possible in a browser — combining real-time WebGL lighting, spatial audio cues, and a scroll-driven narrative to guide users through a product story unlike anything before it. Built with Three.js, GSAP, and custom GLSL shaders.",
    year: '2024',
    color: 'hsl(255, 100%, 65%)',
    tags: ['Three.js', 'GSAP', 'WebGL', 'GLSL'],
    liveUrl: 'https://dipojha.com.np',
  },
  {
    title: 'NEXUS',
    category: 'Platform Design',
    description: 'A next-generation collaboration platform with fluid interfaces and AI-powered workflows.',
    fullDescription: 'Nexus reimagines what a modern collaboration tool looks like — moving away from rigid grids and static panels toward a fluid, gesture-driven canvas. AI-powered suggestions surface at the right moment, while real-time multiplayer keeps teams in sync without friction. Designed in Figma, built in React and TypeScript.',
    year: '2024',
    color: 'hsl(200, 100%, 60%)',
    tags: ['React', 'TypeScript', 'AI', 'Real-time'],
    liveUrl: 'https://dipojha.com.np',
  },
  {
    title: 'PRISM',
    category: 'Creative Direction',
    description: 'Brand identity and digital presence for an architectural studio, blending physical and digital space.',
    fullDescription: "Prism was a full creative direction engagement with an architectural studio — covering visual identity, motion language, and a digital presence that feels as considered as the buildings they design. The site uses scroll-based parallax to simulate depth and space, echoing the studio's philosophy of layering physical environments.",
    year: '2023',
    color: 'hsl(340, 100%, 60%)',
    tags: ['Branding', 'Motion', 'Framer Motion', 'Lenis'],
    liveUrl: 'https://dipojha.com.np',
  },
  {
    title: 'ECHO',
    category: 'Interactive Art',
    description: 'A generative art installation translating sound waves into visual compositions in real-time.',
    fullDescription: 'Echo is a generative art project that listens. Using the Web Audio API and a custom FFT analyser, it transforms ambient sound — from voice to music to silence — into evolving visual compositions. Each session is unique and ephemeral. Exhibited at a digital arts festival and later adapted into a browser-based interactive piece.',
    year: '2023',
    color: 'hsl(160, 100%, 50%)',
    tags: ['Web Audio API', 'Canvas', 'Generative Art', 'p5.js'],
    liveUrl: 'https://dipojha.com.np',
  },
];

type Project = typeof projects[0];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-lg"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="relative w-full max-w-3xl bg-card border border-border rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-px w-full" style={{ background: project.color }} />
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-10 blur-3xl" style={{ background: project.color }} />
          <div className="p-8 md:p-12 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-body text-xs tracking-[0.3em] uppercase px-3 py-1 rounded-full border"
                  style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}12` }}
                >
                  {project.category}
                </span>
                <span className="font-display text-xs text-muted-foreground tracking-widest">{project.year}</span>
              </div>
              <h2 className="font-display font-bold text-foreground leading-none mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                {project.title}
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed text-base">{project.fullDescription}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span key={tag} className="font-body text-xs tracking-wide px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-border">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 font-display text-sm tracking-[0.2em] uppercase px-7 py-3.5 rounded-full transition-all duration-300"
                style={{ background: project.color, color: 'hsl(0 0% 100%)' }}
              >
                Live Demo
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="font-body text-xs text-muted-foreground">Opens in a new tab</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({
  project,
  index,
  total,
  containerRef,
  onSelect,
}: {
  project: Project;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
  onSelect: (p: Project) => void;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Each card occupies 1/total of the scroll range
  const segmentSize = 1 / total;

  // Slide-in: next card only starts entering 55% into its own segment,
  // giving the previous card full visibility first
  const slideInStart = index === 0 ? 0 : index * segmentSize + segmentSize * 0.55;
  const slideInEnd   = index === 0 ? 0 : index * segmentSize + segmentSize * 0.9;

  // Stack-down: current card starts scaling only when the NEXT card begins sliding in
  const stackStart = (index + 1) * segmentSize + segmentSize * 0.55;
  const stackEnd   = Math.min(1, (index + 1) * segmentSize + segmentSize * 0.9);

  // Slide up from below
  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0] : [slideInStart, slideInEnd],
    index === 0 ? ['0%', '0%'] : ['105%', '0%']
  );

  // Scale down into deck after next card settles
  const scale = useTransform(
    scrollYProgress,
    index < total - 1 ? [stackStart, stackEnd] : [1, 1],
    index < total - 1 ? [1, 0.92 - index * 0.02] : [1, 1]
  );

  // Drift upward slightly as it stacks
  const yStack = useTransform(
    scrollYProgress,
    index < total - 1 ? [stackStart, stackEnd] : [1, 1],
    index < total - 1 ? ['0%', `-${(index + 1) * 3}%`] : ['0%', '0%']
  );

  // Fade slightly as deeper in stack
  const opacity = useTransform(
    scrollYProgress,
    index < total - 1 ? [stackStart, stackEnd] : [1, 1],
    index < total - 1 ? [1, 0.75] : [1, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 md:px-14 lg:px-24"
      style={{ y, zIndex: index + 1 }}
    >
      <motion.div
        className="relative w-full max-w-6xl"
        style={{ scale, y: yStack, opacity }}
      >
        {/* Ghost index number */}
        <span
          className="font-display font-bold absolute -top-16 md:-top-28 left-0 opacity-[0.04] leading-none select-none pointer-events-none"
          style={{ color: project.color, fontSize: 'clamp(6rem, 16vw, 14rem)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Card — all content lives inside */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden relative group cursor-pointer"
          style={{
            aspectRatio: '16/9',
            background: `linear-gradient(135deg, hsl(240 8% 12%), hsl(240 8% 8%))`,
            border: `1px solid ${project.color}28`,
          }}
          onClick={() => onSelect(project)}
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient color glow */}
          <motion.div
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${project.color}, transparent 60%)`, opacity: 0.12 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.6 }}
          />

          {/* Corner glow */}
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: project.color }} />

          {/* Center title watermark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display font-bold opacity-[0.05] select-none"
              style={{ color: project.color, fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              {project.title}
            </span>
          </div>

          {/* Top bar: category + year */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-6">
            <span
              className="font-body text-xs tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm"
              style={{ color: project.color, borderColor: `${project.color}40`, background: `${project.color}12` }}
            >
              {project.category}
            </span>
            <span className="font-display text-sm text-muted-foreground">{project.year}</span>
          </div>

          {/* Bottom info overlay — replaces external text */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-20"
            style={{ background: `linear-gradient(to top, hsl(240 8% 6% / 0.95) 0%, hsl(240 8% 8% / 0.6) 60%, transparent 100%)` }}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <h3
                  className="font-display font-bold text-foreground leading-none mb-2"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-body text-muted-foreground leading-relaxed max-w-lg"
                  style={{ fontSize: 'clamp(0.75rem, 1vw, 0.9rem)' }}
                >
                  {project.description}
                </p>
              </div>

              {/* Index */}
              <div className="flex-shrink-0 text-right">
                <span
                  className="font-display font-bold opacity-25 leading-none block"
                  style={{ color: project.color, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-muted-foreground text-xs tracking-widest opacity-50">
                  / {String(total).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Hover: view details overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-display text-base tracking-[0.4em] uppercase text-primary border border-primary/30 px-8 py-3">
              View Details
            </span>
            <span className="font-body text-xs text-muted-foreground tracking-widest">Click to explore</span>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/60 backdrop-blur-sm">
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Section label */}
          <motion.div
            className="absolute top-12 left-6 md:left-12 lg:left-24 z-20 flex items-center gap-6"
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
            className="absolute top-12 right-6 md:right-12 lg:right-24 z-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-display text-xs tracking-[0.4em] uppercase text-muted-foreground">
              {projects.length} Projects
            </span>
          </motion.div>

          {/* Stacked cards */}
          <div className="absolute inset-0 pt-24 pb-16">
            {projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                total={projects.length}
                containerRef={containerRef}
                onSelect={setSelectedProject}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-8 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 z-20">
            <div className="h-px bg-border">
              <motion.div
                className="h-full bg-primary"
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              />
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
