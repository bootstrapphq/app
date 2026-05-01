export default function buildStarter({ blogName }) {
  const brand = { name: blogName, href: "/" };
  return {
    website: {
      theme: {
        color: { primary: "#6366f1" },
      },
      header: {
        type: "uix-site-header",
        props: {
          brand,
          links: [{ label: "Posts", href: "#posts" }],
          actions: [
            { label: "Subscribe", href: "#subscribe", variant: "primary" },
          ],
        },
      },
      footer: {
        type: "uix-footer",
        props: {
          brand,
          tagline: `Welcome to ${blogName}`,
          columns: [],
          copyright: `© ${new Date().getFullYear()} ${blogName}.`,
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
              eyebrow: { label: "Blog", meta: "", href: "" },
              headline: blogName,
              subheadline: "Ideas, updates, and insights.",
              ctas: [
                { label: "Read posts", href: "#posts", variant: "primary" },
              ],
            },
          },
          {
            type: "uix-feature-grid",
            props: {
              sectionId: "posts",
              eyebrow: "Latest",
              headline: "Recent posts",
              subheadline: "",
              variant: "light",
              features: [
                {
                  icon: "file-text",
                  title: `Welcome to ${blogName}`,
                  description:
                    "The first post. Here's what this blog is all about.",
                },
                {
                  icon: "file-text",
                  title: "Getting started",
                  description:
                    "A quick guide to help you get the most out of this blog.",
                },
              ],
            },
          },
          {
            type: "uix-cta-section",
            props: {
              variant: "light",
              headline: "Stay tuned",
              subheadline: "More posts are coming soon.",
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
