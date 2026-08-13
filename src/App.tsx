import { MainLayout } from '@/layouts';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Resume } from '@/components/Resume';
import { Contact } from '@/components/Contact';

/** Every section is real from Phase 6 on. */
export default function App() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </MainLayout>
  );
}
