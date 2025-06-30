import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		updatedDate: z
			.union([z.string(), z.date()])
			.transform((val) => {
				if (val === "") return undefined;
				if (val instanceof Date) return val;
				return new Date(val);
			})
			.optional(),
		heroImage: z.string().optional(),
		heroImageWeighted: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

const bookmarks = defineCollection({
	loader: glob({ base: './src/content/bookmarks', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		url: z.string().url(),
		description: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).optional(), // 💡 this line
		rss: z.boolean().default(true),
	}),
});

export const collections = {
	blog,
	bookmarks,
};
