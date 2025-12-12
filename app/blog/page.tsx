import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { BlogCard } from "@/components/ui/blog-card";
import { DevToArticle } from "@/lib/types";

async function getArticles() {
  try {
    const res = await fetch(
      "https://dev.to/api/articles?username=priscaaa_",
      { 
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PriscaPortfolio/1.0)",
        }
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function BlogPage() {
  const articles: DevToArticle[] = await getArticles();

  return (
    <div className="site-container space-y-24 py-12 md:py-20">
      <div className="mb-20 w-full flex flex-col justify-center items-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          My Tech Journal
        </h1>
        <p className="text-lg text-muted-foreground">
          Bite-sized dev stories, lessons, and experiments from my learning journey.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <h3 className="mb-2 text-xl font-semibold">No articles found</h3>
          <p className="text-muted-foreground">
            Check back later for new content or visit my DEV.to profile directly.
          </p>
        </div>
      )}

      <EducationSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
}
