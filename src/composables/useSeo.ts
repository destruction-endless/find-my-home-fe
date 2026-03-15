interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonicalPath?: string;
}

export function useSeo(options: SeoOptions) {
  const { title, description, keywords, image, canonicalPath } = options;
  const fullTitle = `${title} | Find My Home Realty and Services`;

  document.title = fullTitle;

  setMeta("description", description);
  if (keywords?.length) {
    setMeta("keywords", keywords.join(", "));
  }

  setMetaProperty("og:title", fullTitle);
  setMetaProperty("og:description", description);
  setMetaProperty("og:type", "website");
  if (image) setMetaProperty("og:image", image);
  if (canonicalPath) setMetaProperty("og:url", canonicalPath);

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", fullTitle);
  setMeta("twitter:description", description);
  if (image) setMeta("twitter:image", image);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
