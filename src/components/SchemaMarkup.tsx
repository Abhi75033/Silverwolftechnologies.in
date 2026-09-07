'use client'

interface SchemaProps {
  type: 'organization' | 'localBusiness' | 'service' | 'breadcrumb' | 'faq' | 'website'
  data?: any
}

export default function SchemaMarkup({ type, data }: SchemaProps) {
  const schemas: Record<string, object> = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Silver Wolf Technologies",
      "url": "https://www.silverwolftechnologies.in",
      "logo": "https://www.silverwolftechnologies.in/favicon.png",
      "description": "Full-service digital agency offering web development, SEO, and digital marketing services across India.",
      "foundingDate": "2015",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+916394753801",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi", "Marathi"]
      },
      "sameAs": [
        "https://www.linkedin.com/company/silver-wolf-technologies",
        "https://www.instagram.com/silverwolftechnologies"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Murbad",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    },
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Silver Wolf Technologies",
      "image": "https://www.silverwolftechnologies.in/og-image.jpg",
      "url": "https://www.silverwolftechnologies.in",
      "telephone": "+916394753801",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Murbad",
        "addressLocality": "Murbad",
        "addressRegion": "Maharashtra",
        "postalCode": "421401",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.2333,
        "longitude": 73.3833
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, UPI, Bank Transfer"
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Silver Wolf Technologies",
      "url": "https://www.silverwolftechnologies.in"
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": data?.items || []
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data?.faqs || []
    },
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": data?.serviceType || "Web Development",
      "provider": {
        "@type": "Organization",
        "name": "Silver Wolf Technologies",
        "url": "https://www.silverwolftechnologies.in"
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "description": data?.description || "",
      "name": data?.name || ""
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[type]) }}
    />
  )
}
