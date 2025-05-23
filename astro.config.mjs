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
        "/blog/230525-dev-rabbit-hole/": "/blog/2023/may/dev-rabbit-hole/",
        "/blog/2023-june/": "/blog/2023/june/notes/",
        "/blog/2023-july/": "/blog/2023/july/notes/",
        "/blog/230727-tiny-things/": "/blog/2023/july/tiny-things/",
        "/blog/2023-august/": "/blog/2023/august/notes/",
        "/blog/2023-september/": "/blog/2023/september/notes/",
        "/blog/230911-silence-of-the-girls/": "/blog/2023/september/silence-of-the-girls/",
        "/blog/230928-vegan-banana-bread/": "/blog/2023/september/vegan-banana-bread/",
        "/blog/2023-october/": "/blog/2023/october/notes/",
        "/blog/231021-my-developer-story/": "/blog/2023/october/my-developer-story/",
        "/blog/231023-add-moderation-to-comment-widget/": "/blog/2023/october/add-moderation-to-comment-widget/",
        "/blog/231207-edit-everything/": "/blog/2023/december/edit-everything/",
        "/blog/231213-practical-accessibility/": "/blog/2023/december/practical-accessibility/",
        "/blog/070224-this-website-is-personal-girls/": "/blog/2024/february/this-website-is-personal/",
        "/blog/240109-bookmark-dump/": "/blog/2024/january/bookmark-dump/",
        "/blog/240214-valentines/": "/blog/2024/february/valentines/",
        "/blog/240212-accessible-ascii/": "/blog/2024/february/accessible-ascii/",
        "/blog/240216-life-in-pics/": "/blog/2024/february/life-in-pics/",
        "/blog/240315-give-blood/": "/blog/2024/march/give-bloo/",
        "/blog/240325-breakfast/": "/blog/2024/march/breakfast/",
        "/blog/240409-css-naked/": "/blog/2024/april/   css-naked/",
        "/blog/240411-anon/": "/blog/2024/april/anon/",
        "/blog/240605-shooting-satellite/": "/blog/2024/june/shooting-satellite/",
        "/blog/240614-gemini/": "/blog/2024/june/gemini/",
        "/blog/241108-fill-up-your-cup.md/": "/blog/2024/november/fill-up-your-cup/",
        "/blog/241122-legends-lattes.md/": "/blog/2024/november/legends-and-lattes/",
    }
});