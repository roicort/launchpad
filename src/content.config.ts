import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const authors = defineCollection({
	loader: file('src/content/authors.yml'),
	schema: ({ image }) =>
		z.object({
			id: z.string(),
			name: z.string(),
			bio: z.string(),
			avatar: image().optional(),
			role: z.string().optional(),
			location: z.string().optional(),
			focus: z.string().optional(),
		}),
});

const socials = defineCollection({
	loader: file('src/content/socials.yml'),
	schema: z.object({
		id: z.string().optional(),
		label: z.string(),
		href: z.string(),
	}),
});

export const collections = { blog, socials, authors };
