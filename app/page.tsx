import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero-section";
import { TechnicalSkillsSection } from "@/components/sections/technical-skills";
import { EducationSection } from "@/components/sections/education-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getAllProjectsWithImages } from "@/lib/cloudinary";

export default async function Home() {
  const projects = await getAllProjectsWithImages();

  return (
    <main className="bg-background">
      <div className="site-container space-y-24 py-12">
        <HeroSection />
        <FeaturedProjectsSection projects={projects} />
        <TechnicalSkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </main>
  );
}
