import { config } from "@/helpers/config/envConfig";

const baseUrl =
  config.node_env === "development" ? "http://localhost:3000" : config.base_url;

export const dynamicBlurDataUrl = async (src: string): Promise<string> => {
  try {
    const imageUrl = src.startsWith("http")
      ? src
      : `${baseUrl}${src.startsWith("/") ? src : `/${src}`}`;

    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Failed to fetch image: ${imageUrl}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    const base64str = buffer.toString("base64");

    // Generate an inline SVG blur effect
    const blurSvg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
        <filter id='b' color-interpolation-filters='sRGB'>
          <feGaussianBlur stdDeviation='1' />
        </filter>
        <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0'
          height='100%' width='100%'
          href='data:image/jpeg;base64,${base64str}' />
      </svg>
    `;

    const toBase64 = (str: string) => Buffer.from(str).toString("base64");

    return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
  } catch (error) {
    console.error("[dynamicBlurDataUrl] error:", error);
    return `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==`;
  }
};
