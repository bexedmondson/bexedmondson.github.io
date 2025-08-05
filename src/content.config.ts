import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { autoSidebarLoader } from 'starlight-auto-sidebar/loader'
import { autoSidebarSchema } from 'starlight-auto-sidebar/schema'
import { glob } from 'astro/loaders';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	games: defineCollection({
		loader: glob({ pattern: "**.md", base: "./src/content/docs/games" }),
		schema: docsSchema()
	}),
	projects: defineCollection({
		loader: glob({ pattern: "**.md", base: "./src/content/docs/projects" }),
			schema: docsSchema()
	}),
	blog: defineCollection({
		loader: glob({ pattern: "**.md", base: "./src/content/docs/blog" }),
		schema: docsSchema()
	}),
	autoSidebar: defineCollection({
		loader: autoSidebarLoader(),
		schema: autoSidebarSchema(),
	}),
};
