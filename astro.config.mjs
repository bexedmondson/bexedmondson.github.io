// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";
import sitemap from '@astrojs/sitemap';
import starlightFullViewMode from 'starlight-fullview-mode';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
    site: 'https://bexedmondson.com',
    integrations: [
        starlight({
            title: 'bex edmondson',
            logo: { 
                light: './src/assets/glasses-lightmode.svg',
                dark: './src/assets/glasses-darkmode.svg',
            },
            favicon: '/light-mode-favicon.png', //TODO figure this out
            tableOfContents: false,
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/bexedmondson' }],
            sidebar: [
                {
                    label: 'games',
                    autogenerate: { directory: 'games' }
                },
                {
                    label: 'about',
                    slug: 'about'
                },
                {
                    label: 'contact',
                    slug: 'contact'
                }
            ],
            plugins: [
                catppuccin({
                    dark: { flavor: "mocha", accent: "sapphire" },
                    light: { flavor: "latte", accent: "sapphire" },
                }),
                starlightFullViewMode({ 
                    leftSidebarEnabled: false,  
                    rightSidebarEnabled: true,
                }),
                starlightBlog({
                    navigation: 'sidebar',
                    prevNextLinksOrder: 'chronological'
                })
            ],
            components: {
                Head: './src/components/Head.astro',
                Hero: './src/components/Hero.astro',
                Footer: './src/components/Footer.astro',
            },
            customCss: [
                './src/styles/custom.css',
                '@fontsource/enriqueta/400.css',
                '@fontsource/enriqueta/700.css'
            ],
		}), 
		sitemap()
	],
});