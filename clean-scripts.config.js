module.exports = {
  build: [
    `rimraf dist`,
    `mkdirp dist`,
    {
      js: [
        `file2variable-cli src/vue.template.html -o src/variables.ts --html-minify --base src`,
        `tsc -p src`,
        `tsc -p demo`,
        `webpack --display-modules --config demo/webpack.config.js`
      ],
      css: [
        `lessc src/carousel.less > dist/carousel.css`,
        `cleancss -o dist/carousel.min.css dist/carousel.css`,
        `cleancss -o demo/index.bundle.css dist/carousel.min.css ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css`
      ],
      clean: `rimraf demo/**/index.bundle-*.js`
    },
    `rev-static --config demo/rev-static.config.js`
  ],
  lint: {
    ts: `tslint "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx"`,
    js: `standard "**/*.config.js"`,
    less: `stylelint "src/**/*.less"`,
    export: `no-unused-export "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx" --exclude "src/compiled/**/*"`
  },
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js'
  ],
  fix: {
    ts: `tslint --fix "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx"`,
    js: `standard --fix "**/*.config.js"`,
    less: `stylelint --fix "src/**/*.less"`
  },
  release: `clean-release`,
  watch: `watch-then-execute "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx" "src/**/*.template.html" --exclude "src/*-variables.ts" --script "npm run build"`
}
