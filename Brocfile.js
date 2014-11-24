var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var compileES6 = require('broccoli-es6-concatenator');
var uglifyJS = require('broccoli-uglify-js');
var jshintTree = require('broccoli-jshint');
var filterSass = require('broccoli-sass');
var cleanCSS = require('broccoli-clean-css');
var concatTree = require('broccoli-concat');

var environment = process.env.BROCCOLI_ENV || 'development';

var assets = 'app/assets';

var vendorJS = concatTree(assets, {
  inputFiles: [
    'vendor/jquery-2.1.1/index.js',
    'vendor/almond/almond.js',
    'vendor/rsvp/rsvp.js',
    'vendor/d3/d3.js'
  ],
  outputFile: '/public/js/vendor.js'
});

vendorJS = uglifyJS(vendorJS);

var js = compileES6(assets, {
  inputFiles: [
    'js/**/*.js'
  ],
  legacyFilesToAppend: [],
  wrapInEval: environment !== 'development',
  outputFile: '/public/js/app.js'
});

// var vendorCSS = concatTree(assets, {
//   inputFiles: [],
//   outputFile: ''
// });
// vendorCSS = cleanCSS(vendorCSS);

var css = filterSass(
  assets,
  'sass/main.scss',
  'public/css/app.css',
  {
    imagePath: 'public/img',
    outputStyle: environment === 'development' ? 'expanded' : 'compressed',
    sourceComments: environment === 'development',
    sourceMap:  environment !== 'development'
  }
);

if (environment === 'production') {
  css = cleanCSS(css);
  js = uglifyJS(js);
}

module.exports = mergeTrees(
  [
    vendorJS,
    js,
    // vendorCSS,
    css,
  ],
  {
    overwrite: true
  }
);
