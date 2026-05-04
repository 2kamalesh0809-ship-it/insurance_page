import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'

const input = {}
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'))
files.forEach(file => {
    const name = file.replace('.html', '')
    input[name] = resolve(__dirname, file)
})

export default defineConfig({
  build: {
    rollupOptions: {
      input: input
    },
  },
})
