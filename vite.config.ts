import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: (() => {
      switch(process.env.NODE_ENV){
        case 'amplify':
            return "https://prod.dl9hykqwudssf.amplifyapp.com/"
        default: // github pages
            return "https://dackerson.github.io/chez-david/"
      }
  })()
})