// import { getPlaiceholder } from "plaiceholder";

import { config } from "@/helpers/config/envConfig";

// export const getBase64 = async (src: string) => {
//   try {
//     const buffer = await fetch(src).then(async (res) =>
//       Buffer.from(await res.arrayBuffer())
//     );
//     const { base64 } = await getPlaiceholder(buffer);

//     return base64;
//   } catch (error) {
//     console.log({ error });
//   }
// };
const baseUrl =
  config.node_env === "development" ? "http://localhost:3000" : config.base_url;

export const dynamicBlurDataUrl = async (src: string) => {
  const base64str = await fetch(
    `${baseUrl}/_next/image?url=${src}&w=16&q=75`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64")
  );

  const blurSvg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
        <filter id='b' color-interpolation-filters='sRGB'>
          <feGaussianBlur stdDeviation='1' />
        </filter>
  
        <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
        href='data:image/avif;base64,${base64str}' />
      </svg>
    `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
};
