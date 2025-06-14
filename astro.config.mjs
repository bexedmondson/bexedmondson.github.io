// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";
import starlightAutoSidebar from 'starlight-auto-sidebar';
import sitemap from '@astrojs/sitemap';
import starlightFullViewMode from 'starlight-fullview-mode'

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
                    autogenerate: { directory: 'games' },
                    badge: 'Outdated'
                },
                {
                    label: 'projects',
                    autogenerate: { directory: 'projects' },
                    badge: 'Coming Soon'
                },
                {
                    label: 'blog',
                    autogenerate: { directory: 'blog' },
                    badge: 'Coming Soon'
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
                starlightAutoSidebar(),
                starlightFullViewMode({ 
                    leftSidebarEnabled: false,  
                    rightSidebarEnabled: true,
                }),
            ],
            components: {
                Head: './src/components/Head.astro',
                Hero: './src/components/Hero.astro',
                CollectionCardList: './src/components/CollectionCardList.astro',
                LinkIconCard: './src/components/LinkIconCard.astro',
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