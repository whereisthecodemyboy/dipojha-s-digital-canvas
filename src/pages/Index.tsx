import SmoothScroll from '../components/SmoothScroll';
import CustomCursor from '../components/CustomCursor';
import GrainOverlay from '../components/GrainOverlay';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  return (
    <SmoothScroll>
      <CustomCursor />
      <GrainOverlay />
      <main className="bg-background text-foreground">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
};

export default Index;
