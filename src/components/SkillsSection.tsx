import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 0.95, group: 'Frontend' },
  { name: 'TypeScript', level: 0.9, group: 'Frontend' },
  { name: 'Three.js', level: 0.75, group: 'Creative' },
  { name: 'GSAP', level: 0.85, group: 'Creative' },
  { name: 'Node.js', level: 0.8, group: 'Backend' },
  { name: 'Figma', level: 0.85, group: 'Design' },
  { name: 'WebGL', level: 0.6, group: 'Creative' },
  { name: 'Next.js', level: 0.9, group: 'Frontend' },
  { name: 'Tailwind', level: 0.95, group: 'Frontend' },
  { name: 'Framer Motion', level: 0.88, group: 'Creative' },
  { name: 'Python', level: 0.7, group: 'Backend' },
  { name: 'Blender', level: 0.5, group: 'Creative' },
];

const groupColors: Record<string, string> = {
  Frontend: 'hsl(255, 100%, 65%)',
  Creative: 'hsl(200, 100%, 60%)',
  Backend: 'hsl(160, 100%, 50%)',
  Design: 'hsl(340, 100%, 60%)',
};

const SkillsSection = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden" id="skills">
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
            Capabilities
          </span>
        </motion.div>

        {/* Skill constellation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div className="p-6 rounded-xl border border-border/50 bg-surface-elevated/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group-hover:bg-surface-elevated/60">
                {/* Skill level ring */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="hsl(240, 6%, 18%)"
                      strokeWidth="2"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke={groupColors[skill.group]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - skill.level) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.05 + 0.3, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xs font-semibold text-foreground">
                      {Math.round(skill.level * 100)}
                    </span>
                  </div>
                </div>

                <h4 className="font-display text-sm font-medium text-foreground text-center mb-1">
                  {skill.name}
                </h4>
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-center"
                  style={{ color: groupColors[skill.group] }}>
                  {skill.group}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
