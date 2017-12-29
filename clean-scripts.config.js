const { Service, checkGitStatus, executeScriptAsync } = require('clean-scripts')
const { watch } = require('watch-then-execute')

const tsFiles = `"packages/@(core|vue|react|angular)/@(src|demo)/**/*.@(ts|tsx)" "spec/**/*.ts" "screenshots/**/*.ts"`
const lessFiles = `"packages/core/src/**/*.less"`
const jsFiles = `"*.config.js" "spec/**/*.config.js"`

const vueTemplateCommand = `file2variable-cli --config packages/vue/src/file2variable.config.js`
const tscSrcCommand = [
  `tsc -p packages/core/src`,
  `tsc -p packages/vue/src`,
  `tsc -p packages/react/src`
]
const tscDemoCommand = [
  `tsc -p packages/vue/demo`,
  `tsc -p packages/react/demo`
]
const webpackCommand = `webpack`
const revStaticCommand = `rev-static`
const cssCommand = [
  `lessc packages/core/src/carousel.less -sm=on > packages/core/src/carousel.css`,
  `postcss packages/core/src/carousel.css -o packages/core/dist/carousel.css`,
  `cleancss packages/core/dist/carousel.css -o packages/core/dist/carousel.min.css`,
  `cleancss packages/core/dist/carousel.min.css ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css -o packages/core/demo/index.bundle.css`
]

module.exports = {
  build: [
    {
      js: [
        vueTemplateCommand,
        tscSrcCommand,
        tscDemoCommand,
        webpackCommand
      ],
      css: cssCommand,
      clean: `rimraf "packages/@(core|vue|react|angular)/demo/**/@(*.bundle-*.js|*.bundle-*.css)"`
    },
    revStaticCommand
  ],
  lint: {
    ts: `tslint ${tsFiles}`,
    js: `standard ${jsFiles}`,
    less: `stylelint ${lessFiles}`,
    export: `no-unused-export ${tsFiles} ${lessFiles} --exclude "src/compiled/**/*"`,
    commit: `commitlint --from=HEAD~1`,
    markdown: `markdownlint README.md`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js',
    () => checkGitStatus()
  ],
  fix: {
    ts: `tslint --fix ${tsFiles}`,
    js: `standard --fix ${jsFiles}`,
    less: `stylelint --fix ${lessFiles}`
  },
  watch: {
    vue: `${vueTemplateCommand} --watch`,
    src: `${tscSrcCommand} --watch`,
    demo: `${tscDemoCommand} --watch`,
    webpack: `${webpackCommand} --watch`,
    less: () => watch(['src/**/*.less'], [], () => executeScriptAsync(cssCommand)),
    rev: `${revStaticCommand} --watch`
  },
  screenshot: [
    new Service(`http-server -p 8000`),
    `tsc -p screenshots`,
    `node screenshots/index.js`
  ]
}
