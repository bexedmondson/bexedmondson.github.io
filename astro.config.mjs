// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";

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
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Game', slug: 'games/example' },
					],
				},
				{
					label: 'blog',
					autogenerate: { directory: 'blog' },
				},
			],
			plugins: [
				catppuccin({
					dark: { flavor: "mocha", accent: "sapphire" },
					light: { flavor: "latte", accent: "sapphire" },
				}),
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
