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
    ['header-button', 'size-6 no-drag-area cursor-pointer'],
    ['main-conetnt', 'size-full p-2 box-border'],
    ['blur', "filter-blur backdrop-blur"],
    ['border', "border border-solid border-1px",]
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

      'base-gray-normal': '#66666633',
      'base-gray-light': '#E2E2E2',

      'aside-dark': '#1a1a21',
      'aside-light': '#f2f3f5',

      'active-blue': '#4f46e5',

      'coffee-gray': '#cccccc',
      'coffee-gray-text': '#333333',
      'coffee-gray-hover': '#999999',

      'coffee-border-gray': '#404046',
      'hover-gray': '#27272e',
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
