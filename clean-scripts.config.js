const { Service, executeScriptAsync } = require('clean-scripts')
const { watch } = require('watch-then-execute')

const tsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.@(ts|tsx)" "spec/**/*.ts" "screenshots/**/*.ts"`
const lessFiles = `"packages/core/src/**/*.less"`
const jsFiles = `"*.config.js" "spec/**/*.config.js"`

const vueTemplateCommand = `file2variable-cli --config packages/vue/src/file2variable.config.js`

const tscCoreSrcCommand = `tsc -p packages/core/src`
const tscVueSrcCommand = `tsc -p packages/vue/src`
const tscReactSrcCommand = `tsc -p packages/react/src`

const tscVueDemoCommand = `tsc -p packages/vue/demo`
const tscReactDemoCommand = `tsc -p packages/react/demo`

const webpackVueCommand = `webpack --config packages/vue/demo/webpack.config.js`
const webpackReactCommand = `webpack --config packages/react/demo/webpack.config.js`

const revStaticCommand = `rev-static`
const cssCommand = [
  `lessc packages/core/src/carousel.less --math=strict > packages/core/src/carousel.css`,
  `postcss packages/core/src/carousel.css -o packages/core/dist/carousel.css`,
  `cleancss packages/core/dist/carousel.css -o packages/core/dist/carousel.min.css`,
  `cleancss packages/core/dist/carousel.min.css ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css -o packages/core/demo/index.bundle.css`
]

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  build: [
    {
      js: [
        tscCoreSrcCommand,
        {
          vue: [
            vueTemplateCommand,
            tscVueSrcCommand,
            isDev ? undefined : `rollup --config packages/vue/src/rollup.config.js`,
            tscVueDemoCommand,
            webpackVueCommand
          ],
          react: [
            tscReactSrcCommand,
            isDev ? undefined : `rollup --config packages/react/src/rollup.config.js`,
            tscReactDemoCommand,
            webpackReactCommand
          ]
        }
      ],
      css: cssCommand,
      clean: `rimraf "packages/@(core|vue|react|angular)/demo/**/@(*.bundle-*.js|*.bundle-*.css)"`
    },
    revStaticCommand
  ],
  lint: {
    ts: `eslint --ext .js,.ts ${tsFiles} ${jsFiles}`,
    less: `stylelint ${lessFiles}`,
    export: `no-unused-export ${tsFiles} ${lessFiles} --exclude "src/compiled/**/*"`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'lerna exec -- type-coverage -p src --strict'
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js'
  ],
  fix: {
    ts: `eslint --ext .js,.ts ${tsFiles} ${jsFiles} --fix`,
    less: `stylelint --fix ${lessFiles}`
  },
  watch: {
    vueTemplateCommand: `${vueTemplateCommand} --watch`,
    tscCoreSrcCommand: `${tscCoreSrcCommand} --watch`,
    tscVueSrcCommand: `${tscVueSrcCommand} --watch`,
    tscReactSrcCommand: `${tscReactSrcCommand} --watch`,
    tscVueDemoCommand: `${tscVueDemoCommand} --watch`,
    tscReactDemoCommand: `${tscReactDemoCommand} --watch`,
    webpackVueCommand: `${webpackVueCommand} --watch`,
    webpackReactCommand: `${webpackReactCommand} --watch`,
    less: () => watch(['src/**/*.less'], [], () => executeScriptAsync(cssCommand)),
    rev: `${revStaticCommand} --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
