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
  rules: [
    ['left-center', { left: '50%', transform: 'translateX(-50%)' }],
    ['top-center', { top: '50%', transform: 'translateY(-50%)' }],
    ['drag-area', { '-webkit-app-region': 'drag', '-webkit-user-select': 'none' }],
    ['no-drag-area', { '-webkit-app-region': 'no-drag' }],
  ],
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['header-button', 'size-6 no-drag-area cursor-pointer']
  ],
  theme: {
    colors: {
      // 'veryCool': '#0000ff', // class="text-very-cool"
      // 'brand': {
      //   'primary': 'hsl(var(--hue, 217) 78% 51%)', //class="bg-brand-primary"
      // },
      'base-dark': '#1b1b1f',
      'base-dark-text': '#dfdfd6',


      'base-light': '#ffffff',
      'base-light-text': '#3c3c43',

      'base-gray-normal':'#66666633',


      'aside-dark': '#1a1a21',
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
