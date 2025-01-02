import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";



import netlify from '@astrojs/netlify';



import react from '@astrojs/react';



import node from '@astrojs/node';


import vercel from '@astrojs/vercel';



// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapters: [
    netlify(), 
    vercel(), 
    node({
    mode: 'standalone',
  })]
});