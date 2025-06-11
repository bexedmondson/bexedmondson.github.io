// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";
import starlightAutoSidebar from 'starlight-auto-sidebar'

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
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/bexedmondson' }],
			sidebar: [
				{
					label: 'games',
					//slug: 'games',
					autogenerate: { directory: 'games' },
					badge: 'Outdated'
				},
				{
					label: 'blog',
					autogenerate: { directory: 'blog' },
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
			],
			components: {
				Head: './src/components/Head.astro',
				Hero: './src/components/Hero.astro',
				LinkIconCard: './src/components/LinkIconCard.astro',
			},
			customCss: [
				'./src/styles/custom.css',
				'@fontsource/enriqueta/400.css',
				'@fontsource/enriqueta/700.css'
			],
		}),
	],
});
