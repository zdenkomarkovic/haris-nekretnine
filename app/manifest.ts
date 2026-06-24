import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Haris Nekretnine",
    short_name: "Haris Nekretnine",
    description: "Profesionalna prezentacija nekretnina u Zlatiborskom okrugu i Srbiji.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#14532d",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
