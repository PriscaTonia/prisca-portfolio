import { v2 as cloudinary } from "cloudinary";
import {
  ProjectImage,
  PortfolioProject,
  portfolioProjects,
} from "@/data/projects";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getCloudinaryImagesByFolder(
  folderPath: string
): Promise<ProjectImage[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.error("Cloudinary cloud name not found");
    return [];
  }

  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary API credentials not found");
    return [];
  }

  try {
    // Use Cloudinary Admin API to list resources in the folder
    // The folder path should use forward slashes and match exactly
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPath,
      max_results: 50,
    });

    // Transform Cloudinary response to match your ProjectImage type
    const images: ProjectImage[] = result.resources.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (resource: any, index: number) => ({
        src: resource.secure_url || resource.url,
        alt: resource.context?.alt || `Project screenshot ${index + 1}`,
        caption:
          resource.context?.caption ||
          resource.context?.custom?.caption ||
          `Feature showcase ${index + 1}`,
      })
    );

    return images;
  } catch (error) {
    console.error(`Error fetching images from ${folderPath}:`, error);
    return [];
  }
}

/**
 * Get a project by slug with its images fetched from Cloudinary
 */
export async function getProjectWithImages(
  slug: string
): Promise<PortfolioProject | null> {
  const project = portfolioProjects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return null;
  }

  // If project has a cloudinaryFolder, fetch images
  if (project.cloudinaryFolder) {
    const images = await getCloudinaryImagesByFolder(project.cloudinaryFolder);
    return {
      ...project,
      images,
    };
  }

  return project;
}

/**
 * Get all projects with their images fetched from Cloudinary
 */
export async function getAllProjectsWithImages(): Promise<PortfolioProject[]> {
  const projectsWithImages = await Promise.all(
    portfolioProjects.map(async (project) => {
      if (project.cloudinaryFolder) {
        const images = await getCloudinaryImagesByFolder(
          project.cloudinaryFolder
        );
        return {
          ...project,
          images,
        };
      }
      return project;
    })
  );

  return projectsWithImages;
}
