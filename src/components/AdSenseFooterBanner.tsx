"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Declare adsbygoogle property on the window object for TypeScript
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * AdSenseFooterBanner component
 * Renders a responsive Google AdSense banner that is displayed above the footer.
 * Utilizes the pathname as a key to force component remounting on page changes,
 * and checks element status before pushing to prevent "TagError: All ins elements already have ads".
 */
export function AdSenseFooterBanner() {
  const pathname = usePathname();
  const insRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Ensure window and ins element are defined
    if (typeof window === "undefined" || !insRef.current) return;

    // Check if this ins tag has already been processed or pushed
    const isAlreadyInitialized =
      pushedRef.current ||
      insRef.current.getAttribute("data-adsbygoogle-status") ||
      insRef.current.getAttribute("data-ad-status") ||
      insRef.current.children.length > 0;

    if (isAlreadyInitialized) {
      return;
    }

    try {
      pushedRef.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // Fail silently if an ad blocker prevents loading or initialization
      console.warn("Google AdSense banner initialization failed:", err);
    }
  }, [pathname]);

  return (
    <div
      // Using pathname as the key forces React to unmount and remount this entire DOM tree
      // on route navigation. This ensures a brand new <ins> tag is created.
      key={pathname}
      className="w-full flex justify-center py-8 px-4 bg-transparent border-t border-border/10 my-4"
      aria-hidden="true"
    >
      <div className="w-full max-w-7xl overflow-hidden flex justify-center items-center min-h-[90px] md:min-h-[100px] lg:min-h-[250px]">
        {/* 
          Google AdSense Responsive Unit
          To customize this unit for your specific banner:
          1. Replace the ca-pub-* client ID in layout.tsx if you use a different account.
          2. Replace the data-ad-slot value below with your actual Ad Slot ID.
        */}
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-client="ca-pub-2747147036042508"
          // --- REPLACE THIS SLOT ID WITH YOUR ACTUAL AD SLOT ID ---
          data-ad-slot="YOUR_AD_SLOT_ID_HERE"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

