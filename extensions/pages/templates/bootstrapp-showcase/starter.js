const LOGO = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="url(#paint_logo)"></circle>
    <path d="M12 5V19M5 12H19M8 8L16 16M8 16L16 8" stroke="white" stroke-width="2" stroke-linecap="round"></path>
    <defs>
      <linearGradient id="paint_logo" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF6B6B"></stop>
        <stop offset="0.5" stop-color="#4ECDC4"></stop>
        <stop offset="1" stop-color="#FFE66D"></stop>
      </linearGradient>
    </defs>
  </svg>
`;

export default function buildStarter({ siteName, tagline }) {
  const name = siteName || "Bootstrapp";
  const line =
    tagline ||
    "A ~30KB frontend framework with light DOM components, reactive data, and built-in Service Worker caching — everything you need, nothing you don't.";

  return {
    website: {
      theme: null,
      header: {
        type: "uix-site-header",
        props: {
          brand: { logo: LOGO, name, href: "#" },
          links: [
            { label: "How It Works", href: "#how-it-works" },
            { label: "Why " + name + "?", href: "#features" },
            { label: "Case Studies", href: "#testimonials" },
            { label: "FAQ", href: "#faq" },
            { label: "Pricing", href: "#" },
          ],
          actions: [
            { label: "Login", href: "#", variant: "ghost" },
            { label: "Contact Us", href: "#", variant: "primary" },
          ],
        },
      },
      footer: {
        type: "uix-footer",
        props: {
          brand: { logo: LOGO, name },
          tagline: "The lightweight frontend framework built for speed.",
          columns: [
            {
              title: "Product",
              links: [
                { label: "Features", href: "#" },
                { label: "Pricing", href: "#" },
                { label: "Integrations", href: "#" },
                { label: "Changelog", href: "#" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Blog", href: "#" },
                { label: "Case Studies", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "Support", href: "#" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Legal", href: "#" },
              ],
            },
          ],
          copyright: `© ${new Date().getFullYear()} ${name}. All rights reserved.`,
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
              eyebrow: {
                badge: "New",
                label: "Frontend Framework",
                meta: "Try now ›",
                href: "#",
              },
              headline: "Build Modern Web Apps <br>Without the Bloat ",
              subheadline: line,
              ctas: [
                { label: "Get Started", href: "#", variant: "primary" },
                { label: "View on GitHub", href: "#", variant: "secondary" },
              ],
              image: "https://placehold.co/1040x580/f5f5f4/a3a3a3?text=Hero+Screenshot",
            },
          },
          {
            type: "uix-steps-section",
            props: {
              sectionId: "how-it-works",
              eyebrow: "How It Works",
              eyebrowIcon: "circle-dot",
              headline: "Three Steps to Shipping",
              subheadline:
                "From install to deploy — here's everything you need to ship with " +
                name +
                ".",
              steps: [
                {
                  number: "01",
                  icon: "users",
                  iconColor: "#F59E0B",
                  iconBgColor: "#FFF5EB",
                  iconBorderColor: "#FFEDD5",
                  mockupGradientFrom: "#FFF5EB",
                  mockupGradientTo: "#FFFBF5",
                  title: "Install and Configure",
                  description:
                    "Install the CLI, scaffold a project, and you're ready to build. Sensible defaults mean zero config for most apps.",
                  cta: { label: "Learn more", href: "#" },
                  image: "https://placehold.co/520x360/fff5eb/d97706?text=Install+%26+Configure",
                },
                {
                  number: "02",
                  icon: "zap",
                  iconColor: "#3B82F6",
                  iconBgColor: "#EFF6FF",
                  iconBorderColor: "#DBEAFE",
                  mockupGradientFrom: "#EFF6FF",
                  mockupGradientTo: "#F5F8FF",
                  title: "Compose Components",
                  description:
                    "Object-literal components with lit-html templates and auto-importing. Write Light DOM widgets that play well with any CSS.",
                  cta: { label: "Learn more", href: "#" },
                  image: "https://placehold.co/520x360/eff6ff/3b82f6?text=Compose+Components",
                },
                {
                  number: "03",
                  icon: "file-text",
                  iconColor: "#10B981",
                  iconBgColor: "#ECFDF5",
                  iconBorderColor: "#D1FAE5",
                  mockupGradientFrom: "#ECFDF5",
                  mockupGradientTo: "#F0FCFA",
                  title: "Deploy Anywhere",
                  description:
                    "Ship to any static host, Cloudflare Workers, or your own server. The built-in Service Worker gives you offline support out of the box.",
                  cta: { label: "Learn more", href: "#" },
                  image: "https://placehold.co/520x360/ecfdf5/10b981?text=Deploy+Anywhere",
                },
              ],
              footerCta: {
                label: "Get Started on GitHub",
                icon: "sparkles",
                href: "#",
              },
            },
          },
          {
            type: "uix-feature-grid",
            props: {
              sectionId: "features",
              variant: "dark",
              eyebrow: "Features",
              headline: "Why Developers Choose " + name,
              subheadline:
                "Everything you need to build fast, modern web apps without the complexity.",
              features: [
                {
                  icon: "shield",
                  title: "~30KB Runtime",
                  description:
                    "Lightweight and tree-shakable. Load only what you use, and keep your bundle sizes tiny.",
                },
                {
                  icon: "trending-up",
                  title: "Reactive Model Layer",
                  description:
                    "ORM-style data with IndexedDB sync, reactive arrays, and automatic cross-tab updates.",
                },
                {
                  icon: "globe",
                  title: "Service Worker Ready",
                  description:
                    "Built-in caching, offline support, and cross-tab messaging. No plugins required.",
                },
                {
                  icon: "clock",
                  title: "Light DOM Components",
                  description:
                    "No shadow DOM penalty. Your global CSS just works, and the browser inspector stays readable.",
                },
                {
                  icon: "target",
                  title: "Type System",
                  description:
                    "Declarative T.* types with validation, defaults, and first-class relationships between models.",
                },
                {
                  icon: "chart-no-axes-column",
                  title: "URLPattern Router",
                  description:
                    "Modern client-side routing built on the URLPattern API. Nested routes, params, and history just work.",
                },
              ],
            },
          },
          {
            type: "uix-testimonial-section",
            props: {
              sectionId: "testimonials",
              eyebrow: "Testimonials",
              headline: "Loved by Developers",
              subheadline:
                "Join developers shipping fast, lightweight apps with " +
                name +
                ".",
              testimonials: [
                {
                  quote:
                    name +
                    " cut our bundle size by 80%. We replaced a 300KB stack with a 30KB framework and our pages load instantly.",
                  author: "Sarah Chen",
                  role: "Frontend Lead, Arcade",
                  avatar: "https://i.pravatar.cc/100?img=5",
                  rating: 5,
                },
                {
                  quote:
                    "The Light DOM approach just works. No shadow DOM quirks, our existing Tailwind styles apply everywhere, and reactivity is fantastic.",
                  author: "Marcus Rivera",
                  role: "Staff Engineer, Orbit Labs",
                  avatar: "https://i.pravatar.cc/100?img=12",
                  rating: 5,
                },
                {
                  quote:
                    "Went from prototype to production in two weekends. The built-in Service Worker gave us offline support without writing a line of extra code.",
                  author: "Emma Larsson",
                  role: "Indie Developer",
                  avatar: "https://i.pravatar.cc/100?img=9",
                  rating: 5,
                },
              ],
            },
          },
          {
            type: "uix-faq-section",
            props: {
              sectionId: "faq",
              eyebrow: "FAQ",
              headline: "Frequently Asked Questions",
              items: [
                {
                  question: "What is " + name + "?",
                  answer:
                    name +
                    " is a ~30KB frontend framework with light DOM web components, lit-html templating, a reactive model layer, and a built-in Service Worker for caching and cross-tab sync.",
                },
                {
                  question: "Is " + name + " open source?",
                  answer:
                    "Yes. " +
                    name +
                    " is AGPL-3.0 licensed and developed in the open on GitHub. You can read the source, file issues, and contribute.",
                },
                {
                  question: "What are the browser requirements?",
                  answer:
                    "Modern evergreen browsers that support native ES modules, IndexedDB, and Service Workers. Chrome, Firefox, Safari, and Edge are all fully supported.",
                },
                {
                  question: "How does it compare to React or Vue?",
                  answer:
                    name +
                    " is a native-web alternative. It uses standards like Custom Elements, URLPattern, and ES modules directly — no JSX, no virtual DOM, no build step required.",
                },
                {
                  question: "Can I use " + name + " in production?",
                  answer:
                    "Absolutely. " +
                    name +
                    " ships production builds with minification, bundling, and offline caching. The dev server and build pipeline are designed for real-world deployment.",
                },
              ],
            },
          },
          {
            type: "uix-cta-section",
            props: {
              variant: "dark",
              headline: "Ready to Ship?",
              subheadline:
                "Join developers building fast, lightweight web apps with " +
                name +
                ".",
              ctas: [
                { label: "Get Started", href: "#", variant: "primary" },
                { label: "Read the Docs", href: "#", variant: "secondary" },
              ],
            },
          },
        ],
      },
    ],
  };
}
