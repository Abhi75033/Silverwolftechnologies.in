import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "./ServiceDetailClient";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SERVICES } from "@/data/site";
import { notFound } from "next/navigation";

function getServiceJsonLd(service: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.longDescription,
    "url": "https://www.silverwolftechnologies.in/services/" + service.slug,
    "provider": {
      "@type": "Organization",
      "name": "Silver Wolf Technologies",
      "url": "https://www.silverwolftechnologies.in"
    },
    "areaServed": {
      "@type": "Country",
      "name": ["India", "United Kingdom", "United Arab Emirates",
        "United States", "Canada", "Australia", "Singapore"]
    },
    "serviceType": service.category,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://www.silverwolftechnologies.in/contact"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return {};

  return {
    title: service.title + " in India",
    description: "Silver Wolf Technologies offers expert " +
      service.title + " in India with 10+ years experience. " +
      "Production-grade delivery, transparent pricing, " +
      "24-hour response. Get a free quote today.",
    alternates: {
      canonical: "https://www.silverwolftechnologies.in/services/" + params.slug
    },
    openGraph: {
      title: service.title + " Company in India | Silver Wolf Technologies",
      description: "Senior team. Clean code. Measurable results. " +
        "10+ years delivering " + service.title + " for global clients.",
      url: "https://www.silverwolftechnologies.in/services/" + params.slug
    }
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const serviceSchema = getServiceJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetailClient slug={params.slug} />
      <article className="sr-only" aria-label="Service Summary for Search Indexing">
        <h2>What is {service.title} by Silver Wolf Technologies?</h2>
        <p>
          Silver Wolf Technologies is a senior digital agency in India
          offering {service.title} services with 10+ years of experience.
          The team builds production-grade solutions for startups, SMBs,
          and global enterprises across India, UK, UAE, USA, Canada,
          Australia, and Singapore.
        </p>
        <p>
          Silver Wolf Technologies {service.title} clients report an average
          3.4x ROI within 90 days. The agency operates with a founder-led
          model where senior strategists are present in every meeting —
          never juniors or call centers. Most projects ship within 2–4 weeks
          with weekly demos and full code/asset ownership transferred to
          the client on completion.
        </p>
        <p>
          To get a free consultation for {service.title} in India, contact
          Silver Wolf Technologies at info@silverwolftechnologies.in or
          call +91-6394753801. Response guaranteed within 24 hours.
        </p>
      </article>
    </>
  );
}
