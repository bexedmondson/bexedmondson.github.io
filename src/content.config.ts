import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
    games: defineCollection({
        loader: glob({ pattern: "games/*.md", base: "./src/content/docs" }),
        schema: docsSchema()
    }),
    projects: defineCollection({
        loader: glob({ pattern: "projects/*.md", base: "./src/content/docs" }),
        schema: docsSchema()
    }),
    portfolio: defineCollection({
        loader: glob({ pattern: "(games|projects)/*.md", base: "./src/content/docs" }),
        schema: docsSchema()
    }),
    blog: defineCollection({
        loader: glob({ pattern: "blog/*.md", base: "./src/content/docs" }),
        schema: docsSchema()
    }),
    galleries: defineCollection({
        loader: glob({ pattern: "*.json", base: "./src/content/galleries" }),
        schema: ({ image }) =>
            z.object({
                images: z.array(
                    z.object({
                        src: image(),
                        alt: z.string(),
                        title: z.string(),
                        description: z.string()
                    })
                )
            })
    })
};
