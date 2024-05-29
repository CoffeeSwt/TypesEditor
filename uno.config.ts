// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  rules: [],
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // 'veryCool': '#0000ff', // class="text-very-cool"
      // 'brand': {
      //   'primary': 'hsl(var(--hue, 217) 78% 51%)', //class="bg-brand-primary"
      // },
      'base-black': '#1d232a',
      'base-light': '#ffffff'
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
