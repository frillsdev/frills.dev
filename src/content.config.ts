import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// Transform string to Date object
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
	}),
});

export const collections = { blog };
