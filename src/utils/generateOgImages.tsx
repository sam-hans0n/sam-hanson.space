import { readFileSync } from "node:fs";
import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// Vite emits these assets alongside the server bundle; no network is needed.
import regularFontPath from "../assets/fonts/IBMPlexMono-Regular.ttf?url";
import boldFontPath from "../assets/fonts/IBMPlexMono-Bold.ttf?url";

function readFont(assetPath: string) {
  // Astro asset URLs are root-relative in a build, and /src/... in development.
  const root = import.meta.env.DEV ? "." : "./dist";
  return readFileSync(`${root}${assetPath}`);
}

const fontRegular = readFont(regularFontPath);
const fontBold = readFont(boldFontPath);

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 700,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return new Uint8Array(pngData.asPng()).buffer;
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
