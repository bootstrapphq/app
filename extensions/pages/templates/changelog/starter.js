export default function buildStarter({ siteName }) {
  const brand = { name: siteName, href: "/" };
  return {
    website: {
      theme: {
        color: { primary: "#6366f1" },
      },
      header: {
        type: "uix-site-header",
        props: {
          brand,
          links: [{ label: "Entries", href: "#entries" }],
          actions: [],
        },
      },
      footer: {
        type: "uix-footer",
        props: {
          brand,
          tagline: `What's new in ${siteName}`,
          columns: [],
          copyright: `© ${new Date().getFullYear()} ${siteName}.`,
          socials: [],
        },
      },
    },
    pages: [
      {
        slug: "home",
        name: "Home",
        path: "/",
        sections: [
          {
            type: "uix-hero-section",
            props: {
              eyebrow: { label: "Changelog", meta: "", href: "" },
              headline: siteName,
              subheadline: `Everything new in ${siteName}.`,
              ctas: [
                { label: "Latest release", href: "#entries", variant: "primary" },
              ],
            },
          },
          {
            type: "uix-about-section",
            props: {
              sectionId: "entries",
              eyebrow: "v0.2.0 · 2026-04-17",
              headline: "v0.2.0",
              subheadline: "New features and a handful of fixes.",
              body: `### Added\n- Second sample feature.\n- Support for something new.\n\n### Changed\n- Improved performance on the main view.\n\n### Fixed\n- A small rendering bug.`,
              variant: "prose",
            },
          },
          {
            type: "uix-about-section",
            props: {
              eyebrow: "v0.1.0 · 2026-04-01",
              headline: "v0.1.0",
              subheadline: "First public release.",
              body: `### Added\n- Initial public release of ${siteName}.\n- Core feature set.`,
              variant: "prose",
            },
          },
          {
            type: "uix-cta-section",
            props: {
              variant: "light",
              headline: "Stay in the loop",
              subheadline: "Get notified when we ship the next release.",
              ctas: [
                { label: "Subscribe", href: "#subscribe", variant: "primary" },
              ],
            },
          },
        ],
      },
    ],
  };
}
