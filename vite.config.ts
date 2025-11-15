import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: ( () => {
      switch(process.env.NODE_ENV){
        case 'amplify':
            return "https://main.dl9hykqwudssf.amplifyapp.com/"
        default: // github pages
            return "https://dackerson.github.io/chez-david/"
      }
  })()
})
