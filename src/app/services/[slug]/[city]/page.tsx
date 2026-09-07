import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "../ServiceDetailClient";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SERVICES, SITE, cityFromSlug, citySlug } from "@/data/site";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string; city: string } }) {
  return generateServiceMetadata(params.slug, params.city);
}

export default function ServiceCityPage({ params }: { params: { slug: string; city: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const city = cityFromSlug(params.city);
  if (!city) return notFound();

  const pageUrl = `https://www.silverwolftechnologies.in/services/${service.slug}/${citySlug(city)}`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Silver Wolf Technologies — " + service.title + " in " + city,
    "url": pageUrl,
    "description": "Silver Wolf Technologies provides " + service.title +
      " in " + city + ". Senior team with 10+ years experience, " +
      "transparent pricing, and 24-hour response guarantee.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressCountry": "IN"
    },
    "telephone": "+91-6394753801",
    "email": "info@silverwolftechnologies.in",
    "areaServed": city,
    "parentOrganization": {
      "@type": "Organization",
      "name": "Silver Wolf Technologies",
      "url": "https://www.silverwolftechnologies.in"
    },
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ServiceDetailClient slug={params.slug} citySlugParam={params.city} />
    </>
  );
}

