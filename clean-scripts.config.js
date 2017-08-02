module.exports = {
  build: [
    `rimraf dist && rimraf demo/**/index.bundle-*.js`,
    `file2variable-cli src/vue.template.html -o src/variables.ts --html-minify --base src`,
    `tsc -p src`,
    `tsc -p demo`,
    `lessc src/carousel.less > dist/carousel.css`,
    `cleancss -o dist/carousel.min.css dist/carousel.css`,
    `cleancss -o demo/index.bundle.css dist/carousel.min.css ./node_modules/github-fork-ribbon-css/gh-fork-ribbon.css`,
    `webpack --display-modules --config demo/webpack.config.js`,
    `rev-static --config demo/rev-static.config.js`
  ],
  lint: [
    `tslint "src/**/*.ts" "src/**/*.tsx" "demo/**/*.ts" "demo/**/*.tsx"`,
    `standard "**/*.config.js"`,
    `stylelint "src/**/*.less"`
  ],
  test: [
    'tsc -p spec',
    'karma start spec/karma.config.js'
  ],
  fix: [
    `standard --fix "**/*.config.js"`
  ],
  release: [
    `clean-release`
  ]
}
