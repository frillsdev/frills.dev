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
    "/blog/230525-dev-rabbit-hole/": "/blog/2023/05/dev-rabbit-hole/",
    "/blog/2023-june/": "/blog/2023/06/notes/",
    "/blog/2023-july/": "/blog/2023/07/notes/",
    "/blog/230727-tiny-things/": "/blog/2023/07/tiny-things/",
    "/blog/2023-august/": "/blog/2023/08/notes/",
    "/blog/2023-september/": "/blog/2023/09/notes/",
    "/blog/230911-silence-of-the-girls/": "/blog/2023/09/silence-of-the-girls/",
    "/blog/230928-vegan-banana-bread/": "/blog/2023/09/vegan-banana-bread/",
    "/blog/2023-october/": "/blog/2023/10/notes/",
    "/blog/231021-my-developer-story/": "/blog/2023/10/my-developer-story/",
    "/blog/231023-add-moderation-to-comment-widget/": "/blog/2023/10/add-moderation-to-comment-widget/",
    "/blog/231207-edit-everything/": "/blog/2023/12/edit-everything/",
    "/blog/231213-practical-accessibility/": "/blog/2023/12/practical-accessibility/",
    "/blog/070224-this-website-is-personal-girls/": "/blog/2024/04/this-website-is-personal/",
    "/blog/240109-bookmark-dump/": "/blog/2024/01/bookmark-dump/",
    "/blog/240214-valentines/": "/blog/2024/04/valentines/",
    "/blog/240212-accessible-ascii/": "/blog/2024/04/accessible-ascii/",
    "/blog/240216-life-in-pics/": "/blog/2024/04/life-in-pics/",
    "/blog/240315-give-blood/": "/blog/2024/03/give-blood/",
    "/blog/240325-breakfast/": "/blog/2024/03/breakfast/",
    "/blog/240409-css-naked/": "/blog/2024/04/css-naked/",
    "/blog/240411-anon/": "/blog/2024/04/anon/",
    "/blog/240605-shooting-satellite/": "/blog/2024/06/shooting-satellite/",
    "/blog/240614-gemini/": "/blog/2024/06/gemini/",
    "/blog/241108-fill-up-your-cup.md/": "/blog/2024/11/fill-up-your-cup/",
    "/blog/241122-legends-lattes.md/": "/blog/2024/11/legends-and-lattes/",
  }
});