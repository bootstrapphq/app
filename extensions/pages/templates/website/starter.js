export default function buildStarter({ siteName, tagline }) {
  const brand = { name: siteName, href: "/" };
  const headerLinks = [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];
  return {
    website: {
      theme: {
        color: {
          primary: "#6366f1",
          "surface-inverse": "#0f0f0f",
        },
      },
      header: {
        type: "uix-site-header",
        props: {
          brand,
          links: headerLinks,
          actions: [
            { label: "Get started", href: "/pricing", variant: "primary" },
          ],
        },
      },
      footer: {
        type: "uix-footer",
        props: {
          brand,
          tagline,
          columns: [
            {
              title: "Product",
              links: [
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
              ],
            },
            {
              title: "Company",
              links: [{ label: "Contact", href: "/contact" }],
            },
          ],
          copyright: `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`,
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
              eyebrow: { label: "New", meta: "Just shipped ›", href: "/about" },
              headline: siteName,
              subheadline: tagline,
              ctas: [
                { label: "Get started", href: "/pricing", variant: "primary" },
                { label: "Learn more", href: "/about", variant: "secondary" },
              ],
            },
          },
          {
            type: "uix-feature-grid",
            props: {
              eyebrow: "Features",
              headline: `What makes ${siteName} different`,
              subheadline: "A short list of the things we do well.",
              variant: "light",
              features: [
                {
                  icon: "zap",
                  title: "Fast & reliable",
                  description:
                    "Built for speed from the ground up. Every interaction is instant.",
                },
                {
                  icon: "smile",
                  title: "Easy to use",
                  description:
                    "Designed with simplicity in mind. Get started in minutes.",
                },
                {
                  icon: "trending-up",
                  title: "Built to scale",
                  description:
                    "Start small, grow big. Adapts to solo or team use.",
                },
              ],
            },
          },
          {
            type: "uix-cta-section",
            props: {
              variant: "dark",
              headline: "Ready to get started?",
              subheadline: `Join the people already using ${siteName}.`,
              ctas: [
                { label: "See pricing", href: "/pricing", variant: "primary" },
                { label: "Contact us", href: "/contact", variant: "secondary" },
              ],
            },
          },
        ],
      },
      {
        slug: "about",
        name: "About",
        path: "/about",
        sections: [
          {
            type: "uix-hero-section",
            props: {
              eyebrow: { label: "About", meta: "", href: "" },
              headline: `About ${siteName}`,
              subheadline: "Simple tools, built around how you actually work.",
              ctas: [],
            },
          },
          {
            type: "uix-about-section",
            props: {
              eyebrow: "Our story",
              headline: `Why we built ${siteName}`,
              subheadline: "",
              body: `We started ${siteName} because we were tired of tools that get in the way. We believe software should be simple, transparent, and built around the people who use it.\n\nOur mission is to make powerful tools accessible to everyone. No complexity, no friction, no bloat — just the features you need, designed to work the way you think.`,
              variant: "prose",
            },
          },
          {
            type: "uix-showcase-section",
            props: {
              eyebrow: "Showcase",
              headline: "See it in action",
              subheadline:
                "A powerful workspace designed around how you actually work.",
              image: {
                src: "/assets/screenshot.png",
                alt: `${siteName} screenshot`,
              },
              align: "right",
              ctas: [
                {
                  label: "See pricing",
                  href: "/pricing",
                  variant: "primary",
                },
              ],
            },
          },
        ],
      },
      {
        slug: "pricing",
        name: "Pricing",
        path: "/pricing",
        sections: [
          {
            type: "uix-hero-section",
            props: {
              eyebrow: { label: "Pricing", meta: "", href: "" },
              headline: "Simple, transparent pricing",
              subheadline: "Start free. Upgrade when you need more.",
              ctas: [],
            },
          },
          {
            type: "uix-pricing-table",
            props: {
              eyebrow: "Plans",
              headline: "Pick a plan that fits",
              subheadline: "",
              plans: [
                {
                  name: "Free",
                  price: "$0",
                  period: "/month",
                  description: "Everything you need to try it out.",
                  features: ["Up to 3 projects", "Community support"],
                  cta: { label: "Get started", href: "/contact" },
                  highlighted: false,
                },
                {
                  name: "Pro",
                  price: "$29",
                  period: "/month",
                  description: "For serious work.",
                  features: [
                    "Unlimited projects",
                    "Priority support",
                    "Advanced features",
                  ],
                  cta: { label: "Start Pro", href: "/contact" },
                  highlighted: true,
                },
                {
                  name: "Team",
                  price: "$99",
                  period: "/month",
                  description: "For growing teams.",
                  features: [
                    "Everything in Pro",
                    "Team roles & permissions",
                    "Dedicated support",
                  ],
                  cta: { label: "Talk to sales", href: "/contact" },
                  highlighted: false,
                },
              ],
            },
          },
          {
            type: "uix-faq-section",
            props: {
              eyebrow: "FAQ",
              headline: "Billing questions",
              subheadline: "",
              items: [
                {
                  question: "Can I cancel any time?",
                  answer:
                    "Yes. You can cancel or downgrade any time from your account settings.",
                },
                {
                  question: "Do you offer refunds?",
                  answer:
                    "We offer a 14-day money-back guarantee on all paid plans.",
                },
              ],
            },
          },
        ],
      },
      {
        slug: "contact",
        name: "Contact",
        path: "/contact",
        sections: [
          {
            type: "uix-hero-section",
            props: {
              eyebrow: { label: "Contact", meta: "", href: "" },
              headline: "Get in touch",
              subheadline: "We usually respond within a few hours.",
              ctas: [
                {
                  label: "Email us",
                  href: "mailto:hi@example.com",
                  variant: "primary",
                },
              ],
            },
          },
          {
            type: "uix-about-section",
            props: {
              eyebrow: "",
              headline: "Where to find us",
              subheadline: "",
              body: `The fastest way to reach us is email: **hi@example.com**. We'll get back to you within a few hours during business hours.\n\nFor support questions, please check the [FAQ on our pricing page](/pricing#faq) first — it covers the most common questions.`,
              variant: "prose",
            },
          },
        ],
      },
    ],
  };
}
