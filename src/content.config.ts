import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
	docs: defineCollection({ 
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) => blogSchema(context)
		}) 
	}),
    games: defineCollection({
        loader: glob({ pattern: "**.md", base: "./src/content/docs/games" }),
        schema: docsSchema()
    }),
    projects: defineCollection({
        loader: glob({ pattern: "**.md", base: "./src/content/docs/projects" }),
        schema: docsSchema()
    }),
    portfolio: defineCollection({
        loader: glob({ pattern: "(games|projects)/*.md", base: "./src/content/docs" }),
        schema: docsSchema()
    })
};
