import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://sam-hanson.space", // replace this with your deployed domain
  author: "Sam Hanson",
  desc: "A cybersecurity professional's research website.",
  title: "Sam Hanson",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-US"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

// Disable the logo image and use the site title as the mark.
export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/sam-hans0n",
    linkTitle: ` ${SITE.title} on Github`,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sam-hanson-8153b7152",
    linkTitle: `${SITE.title} on LinkedIn`,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/sam-hans0n.bsky.social",
    linkTitle: `${SITE.title} on Bluesky`,
  },
  {
    name: "Twitter",
    href: "https://x.com/__samhanson__",
    linkTitle: `${SITE.title} on Twitter`,
  },
];
