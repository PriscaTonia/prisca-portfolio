import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero-section";
import { TechnicalSkillsSection } from "@/components/sections/technical-skills";
import { EducationSection } from "@/components/sections/education-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="bg-background">
      <div className="site-container space-y-24 py-12">
        <HeroSection />
        <FeaturedProjectsSection />
        <TechnicalSkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </main>
  );
}
