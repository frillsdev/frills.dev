// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://frills.dev',
  integrations: [mdx(), sitemap(), react()],
  prefetch: {
    prefetchAll: true
  },
  redirects: {
    "/blog/230525-dev-rabbit-hole/": "/blog/dev-rabbit-hole/",
    "/blog/2023-june/": "/blog/notes/",
    "/blog/2023-july/": "/blog/notes/",
    "/blog/230727-tiny-things/": "/blog/tiny-things/",
    "/blog/2023-august/": "/blog/notes/",
    "/blog/2023-september/": "/blog/notes/",
    "/blog/230911-silence-of-the-girls/": "/blog/silence-of-the-girls/",
    "/blog/230928-vegan-banana-bread/": "/blog/vegan-banana-bread/",
    "/blog/2023-october/": "/blog/notes/",
    "/blog/231021-my-developer-story/": "/blog/my-developer-story/",
    "/blog/231023-add-moderation-to-comment-widget/": "/blog/add-moderation-to-comment-widget/",
    "/blog/231207-edit-everything/": "/blog/edit-everything/",
    "/blog/231213-practical-accessibility/": "/blog/practical-accessibility/",
    "/blog/070224-this-website-is-personal-girls/": "/blog/this-website-is-personal/",
    "/blog/240109-bookmark-dump/": "/blog/bookmark-dump/",
    "/blog/240214-valentines/": "/blog/valentines/",
    "/blog/240212-accessible-ascii/": "/blog/accessible-ascii/",
    "/blog/240216-life-in-pics/": "/blog/life-in-pics/",
    "/blog/240315-give-blood/": "/blog/give-blood/",
    "/blog/240325-breakfast/": "/blog/breakfast/",
    "/blog/240409-css-naked/": "/blog/css-naked/",
    "/blog/240411-anon/": "/blog/anon/",
    "/blog/240605-shooting-satellite/": "/blog/shooting-satellite/",
    "/blog/240614-gemini/": "/blog/gemini/",
    "/blog/241108-fill-up-your-cup.md/": "/blog/fill-up-your-cup/",
    "/blog/241122-legends-lattes.md/": "/blog/legends-and-lattes/",
  }
});