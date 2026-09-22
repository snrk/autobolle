import Image from '@11ty/eleventy-img'
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'
import fs from 'node:fs'
import path from 'node:path'

const IMG_OPTIONS = {
  widths: [248, 496, 992, 'auto'],
  formats: ['avif', 'webp', 'jpeg'],
  outputDir: '_site/assets/images',
  urlPath: '/assets/images/',
}

// ton shortcode existant, inchangé
async function imageShortcode(src, alt, sizes, loading, css) {
  let metadata = await Image(src, IMG_OPTIONS)
  let imageAttributes = {
    alt,
    sizes,
    'decoding': 'async',
    loading,
    'class': css,
    'data-url': metadata.jpeg[0].url,
  }
  return Image.generateHTML(metadata, imageAttributes)
}

// construit les <source> d'une variante (une balise par format)
function sourcesFor(metadata, sizes, media) {
  let m = media ? ` media="${media}"` : ''
  return Object.values(metadata)
    .map((formatEntries) => {
      let srcset = formatEntries.map((e) => e.srcset).join(', ')
      let type = formatEntries[0].sourceType
      return `<source type="${type}"${m} srcset="${srcset}" sizes="${sizes}">`
    })
    .join('\n')
}

async function themedImageShortcode(
  lightSrc,
  darkSrc,
  alt,
  sizes,
  loading,
  css,
) {
  if (alt === undefined) {
    throw new Error(
      `Missing \`alt\` on themedImage from: ${lightSrc}`,
    )
  }

  let light = await Image(lightSrc, IMG_OPTIONS)
  let dark = await Image(darkSrc, IMG_OPTIONS)

  // fallback <img> : variante claire, plus petit / plus grand JPEG
  let jpeg = light.jpeg
  let fallback = jpeg[0]
  let biggest = jpeg[jpeg.length - 1]

  let classAttr = css ? ` class="${css}"` : ''

  return `<picture>
${sourcesFor(dark, sizes, '(prefers-color-scheme: dark)')}
${sourcesFor(light, sizes, null)}
<img src="${fallback.url}" width="${biggest.width}" height="${biggest.height}" alt="${alt}" loading="${loading || 'lazy'}" decoding="async"${classAttr} data-url="${fallback.url}">
</picture>`
}

// async function imageShortcode(src, alt, sizes, loading, css) {
//   let metadata = await Image(src, {
//     widths: [210, 420, 630, 760, 1130, 'auto'],
//     formats: ['avif', 'webp', 'jpeg'],
//     outputDir: '_site/assets/images',
//     urlPath: '/assets/images/',
//   })

//   let imageAttributes = {
//     alt,
//     sizes,
//     decoding: 'async',
//     loading: loading,
//     class: css,
//     'data-url': metadata.jpeg[0].url,
//   }

//   // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
//   return Image.generateHTML(metadata, imageAttributes)
// }

async function shareImageShortcode(src) {
  let metadata = await Image(src, {
    widths: [600],
    formats: ['png'],
    outputDir: '_site/assets/images',
    urlPath: '/assets/images/',
  })

  const data = metadata.png[0]
  // data.url might be /blog/hello-world/xfO_genLg4-600.jpeg
  // note the filename is a content hash-width combination
  return data.url
}

export default function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode(
    'shareImageUri',
    shareImageShortcode,
  )
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)

  eleventyConfig.addNunjucksAsyncShortcode(
    'themedImage',
    themedImageShortcode,
  )

  eleventyConfig.addPassthroughCopy('src/css/')
  eleventyConfig.addPassthroughCopy('src/js/')
  eleventyConfig.addPassthroughCopy('src/assets/fonts/')
  eleventyConfig.addPassthroughCopy('src/assets/videos/')
  if (
    !process.env.ELEVENTY_ENV ||
    process.env.ELEVENTY_ENV === 'development'
  ) {
    eleventyConfig.addPassthroughCopy('src/dummy-cars.json')
    eleventyConfig.addPassthroughCopy('src/dummy-car-detail.json')
  }
  //   eleventyConfig.addPassthroughCopy('src/.htaccess')

  eleventyConfig.addPassthroughCopy({
    'src/assets/images': 'assets/images',
  })

  eleventyConfig.addShortcode('svg', function (filename) {
    const svgPath = path.resolve(
      process.cwd(),
      'src/assets/images',
      `${filename}.svg`,
    )
    return fs.readFileSync(svgPath, 'utf8')
  })

  eleventyConfig.addWatchTarget('src/css')
  eleventyConfig.addWatchTarget('src/js')

  eleventyConfig.addGlobalData(
    'env',
    process.env.ELEVENTY_ENV || 'development',
  )

  let base = '/' // Valeur par défaut pour le mode de build

  if (process.env.ELEVENTY_ENV === 'liveTest') {
    base = '/ab'
  }

  //   eleventyConfig.addPlugin(EleventyVitePlugin, {
  //     // defaults are shown
  //     viteOptions: {
  //       publicDir: 'public',
  //       clearScreen: false,
  //       server: {
  //         mode: 'development',
  //         host: '192.168.1.71',
  //         middlewareMode: true,
  //       },
  //       appType: 'custom',
  //       assetsInclude: ['**/*.xml', '**/*.txt', '**/.htaccess.*'],
  //       build: {
  //         mode: 'production',
  //         rolldownOptions: {
  //           output: {
  //             assetFileNames: 'assets/[name].[hash].[ext]',
  //           },
  //         },
  //       },
  //       base: base,
  //     },
  //   })
  eleventyConfig.setServerOptions({
    // Affiche les IP locales (ex: 192.168.1.71) dans le terminal au démarrage
    showAllHosts: true,
    port: 8080,
  })
  // Plugins
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      clearScreen: false,
      base: base,
      server: {
        mode: 'development',
        middlewareMode: true,
        host: '0.0.0.0',
        port: 8080,
      },
      //   resolve: {
      //     alias: {
      //       // Cette ligne permet au navigateur de trouver qrcode
      //       '/node_modules': path.resolve('.', 'node_modules'),
      //     },
      //   },
      appType: 'custom',
    },
  })

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  }
}
