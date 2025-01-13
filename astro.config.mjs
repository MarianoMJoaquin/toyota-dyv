import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";


<<<<<<< HEAD




=======
>>>>>>> b1500ef4e815c5c672409b6207e16d7c64a36741
import react from '@astrojs/react';
import node from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
});
