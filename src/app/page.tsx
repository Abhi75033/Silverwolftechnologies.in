import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { Portfolio } from "@/components/site/Portfolio";
import { Testimonials } from "@/components/site/Testimonials";
import { About } from "@/components/site/About";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import SchemaMarkup from "@/components/SchemaMarkup";
import type { Metadata } from "next";

const HOME_TITLE = 'Web Development & SEO Company in India';
const HOME_DESCRIPTION = 'Silver Wolf Technologies — 10+ years building websites, mobile apps, CRMs and SEO/digital marketing for businesses across India and globally. Get a free quote today.';

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.silverwolftechnologies.in/',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://www.silverwolftechnologies.in/',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

/** Homepage FAQ data — mirrored from the FAQ component for JSON-LD schema */
const homepageFaqs = [
  { question: "How much does a website cost in India?", answer: "Business websites range from ₹15,000 to ₹2,00,000+ depending on features, integrations and design complexity. We provide transparent custom quotes after a free consultation." },
  { question: "Do you work with international clients?", answer: "Yes — we actively serve clients across the USA, UK, Canada, UAE and Australia, with timezone-flexible communication and weekly sprint demos." },
  { question: "How long does a project take?", answer: "Most marketing websites launch in 2–4 weeks. Mobile apps and CRMs typically take 6–12 weeks depending on scope. We share a fixed timeline before kickoff." },
  { question: "Do you offer SEO and marketing as a retainer?", answer: "Yes — our SEO and digital marketing services run as monthly retainers starting from ₹25,000/month, with full reporting dashboards and dedicated account managers." },
  { question: "Will I own the code and assets?", answer: "100%. All source code, design files and marketing assets transfer to you on project completion. No vendor lock-in." },
  { question: "Which cities in India do you serve?", answer: "We work with clients across Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, Ahmedabad, Chennai, Kolkata and every other state — fully remote-first." },
];

const schema1 = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "name": "Silver Wolf Technologies",
  "url": "https://www.silverwolftechnologies.in",
  "logo": "https://www.silverwolftechnologies.in/_next/static/media/logo.d7fb2ec1.png",
  "image": "https://www.silverwolftechnologies.in/_next/static/media/hero-bg.3c461c14.jpg",
  "description": "Silver Wolf Technologies is a senior digital agency with 10+ years building high-performance websites, mobile apps, CRMs, SaaS platforms, and executing SEO and digital marketing campaigns for startups, SMBs and global enterprises across India and worldwide.",
  "foundingDate": "2014",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 50 },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Murbad",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN", 
    "postalCode": "421401"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.2333,
    "longitude": 73.3833
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-6394753801",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": ["IN", "GB", "AE", "US", "CA", "AU", "SG"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-6394753801",
      "contactType": "sales",
      "availableLanguage": ["English", "Hindi"]
    }
  ],
  "email": "info@silverwolftechnologies.in",
  "sameAs": [
    "https://wa.me/916394753801"
  ],
  "areaServed": ["India", "United Kingdom", "United Arab Emirates",
    "United States", "Canada", "Australia", "Singapore"],
  "priceRange": "₹₹",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Agency Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS & Web Apps" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design" } }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const schema2 = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Silver Wolf Technologies",
  "url": "https://www.silverwolftechnologies.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.silverwolftechnologies.in/services/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const schema3 = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a website cost in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Website development cost in India varies by complexity. Silver Wolf Technologies builds business websites starting from affordable packages, with e-commerce and enterprise platforms priced based on scope. Contact us for a free transparent quote within 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Does Silver Wolf Technologies work with international clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Silver Wolf Technologies works with clients across India, UK, UAE, USA, Canada, Australia, and Singapore. The team collaborates seamlessly across IST, EST, GMT and AEST timezones with senior strategists in every meeting."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a website or app project take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most business websites ship in 2–4 weeks. Mobile apps typically take 8–12 weeks. CRM and SaaS platforms are scoped per project. Silver Wolf uses sprint-based execution with weekly demos and transparent timelines."
      }
    },
    {
      "@type": "Question",
      "name": "Does Silver Wolf Technologies offer SEO and marketing as a retainer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Silver Wolf Technologies offers monthly SEO and digital marketing retainers. They currently manage 50+ active retainers across SaaS, e-commerce, D2C and service businesses, delivering an average 3.4x ROI within 90 days."
      }
    },
    {
      "@type": "Question",
      "name": "Will I own the code and assets after the project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Silver Wolf Technologies delivers full code ownership and all creative assets to clients upon project completion. You get clean, well-documented codebases that any team can maintain."
      }
    },
    {
      "@type": "Question",
      "name": "Which cities in India does Silver Wolf Technologies serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Silver Wolf Technologies serves 22+ cities and 434+ localities across India including Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur, Lucknow, Chandigarh, Noida, Gurgaon, Indore, Surat, and Kochi, along with international locations."
      }
    }
  ]
};


export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema1) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema2) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema3) }}
      />
      <Hero />
      <Services />
      <WhyUs />
      <Portfolio />
      <Testimonials />
      {/* <About /> — commented out: will re-enable once all team member profiles are ready */}
      <FAQ />
      <Contact />
    </>
  );
}

