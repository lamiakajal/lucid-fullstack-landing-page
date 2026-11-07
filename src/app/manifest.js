/** Web app manifest: lets the site be installed and improves mobile browser UI. */
export default function manifest() {
  return {
    name: "Lucid by Lamia Kajal",
    short_name: "Lucid",
    description: "A responsive, animated full-stack landing page built with Next.js and Tailwind CSS.",
    start_url: "/",
    display: "standalone",
    background_color: "#15171e",
    theme_color: "#15171e",
    icons: [{ src: "/icon.png", sizes: "500x500", type: "image/png" }],
  };
}
