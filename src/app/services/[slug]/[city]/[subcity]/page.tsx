import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "../../ServiceDetailClient";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SERVICES, SITE, cityFromSlug, subCityFromSlug, citySlug } from "@/data/site";
import { getAreaData } from "@/lib/locationData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string; city: string; subcity: string } }) {
  return generateServiceMetadata(params.slug, params.city, params.subcity);
}

export default function ServiceSubCityPage({ params }: { params: { slug: string; city: string; subcity: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const city = cityFromSlug(params.city);
  const subCity = city ? subCityFromSlug(city, params.subcity) : undefined;
  if (!city || !subCity) return notFound();

  const areaData = getAreaData(params.city, params.subcity, service.title);

  const pageUrl = `https://www.silverwolftechnologies.in/services/${service.slug}/${citySlug(city)}/${citySlug(subCity)}`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Silver Wolf Technologies — " + service.title + " in " + subCity,
    "url": pageUrl,
    "description": "Silver Wolf Technologies provides " + service.title +
      " in " + subCity + ". Senior team with 10+ years experience, " +
      "transparent pricing, and 24-hour response guarantee.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": subCity,
      "addressCountry": "IN"
    },
    "telephone": "+91-6394753801",
    "email": "info@silverwolftechnologies.in",
    "areaServed": subCity,
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
      {areaData && areaData.faqs && areaData.faqs.length > 0 && (
        <SchemaMarkup
          type="faq"
          data={{
            faqs: areaData.faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }}
        />
      )}
      <ServiceDetailClient slug={params.slug} citySlugParam={params.city} subCitySlugParam={params.subcity} />
    </>
  );
}
