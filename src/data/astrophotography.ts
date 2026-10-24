/** Add finished, web-ready photographs to public/astrophotography/ and list them here. */
export interface AstroPhoto {
  src: string;
  fullSrc?: string;
  title: string;
  alt: string;
  target?: string;
  captured?: string;
  location?: string;
  iso?: string;
  exposure?: string;
  frames?: string;
  equipment?: string;
  story?: string[];
  factSource?: string;
}

export const astroPhotos: AstroPhoto[] = [
  {
    src: "/astrophotography/north-america-nebula-thumb.webp",
    fullSrc: "/astrophotography/north-america-nebula.webp",
    title: "North America Nebula (NGC 7000)",
    alt: "Red clouds of the North America Nebula surrounded by a dense field of stars",
    target: "Emission nebula in Cygnus",
    captured: "October 22, 2026",
    location: "Metcalf Field observing site, Afton, MN",
    iso: "1600",
    exposure: "1 minute per image",
    frames: "47 images",
    equipment:
      "Sky-Watcher Star Adventurer GTi tracker • Askar FMA180 Pro astrograph • Canon EOS Rebel T6 DSLR",
    story: [
      "The North America Nebula's red glow comes from hydrogen clouds lit by stars hidden within it.",
      "I stacked 47 one-minute exposures to bring out its shape against the crowded Cygnus star field.",
    ],
    factSource: "https://www.eso.org/public/images/b04/",
  },
  {
    src: "/astrophotography/cygnus-m39-thumb.webp",
    fullSrc: "/astrophotography/cygnus-m39.webp",
    title: "Cygnus and M39",
    alt: "A broad Cygnus star field with the M39 star cluster in the upper left",
    target: "Cygnus star field and M39 open cluster",
    captured: "October 22, 2026",
    location: "Metcalf Field observing site, Afton, MN",
    iso: "1600",
    exposure: "1 minute per image",
    frames: "39 images",
    equipment:
      "Sky-Watcher Star Adventurer GTi tracker • Askar FMA180 Pro astrograph • Canon EOS Rebel T6 DSLR",
    story: [
      "M39 landed in the upper-left corner of this wide Cygnus frame by accident.",
      "It's a loose open cluster about 800 light-years away, with roughly 30 recognized stars. Some of its brightest stars are approaching their red-giant phase.",
    ],
    factSource: "https://www.eso.org/public/images/b04/",
  },
];
