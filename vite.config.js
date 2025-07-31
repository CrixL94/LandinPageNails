import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'; // Babel version (estable)
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
