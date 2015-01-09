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
    'vendor/d3/d3.js',
    'vendor/bootstrap/dist/js/bootstrap.js',
    'vendor/toastr/toastr.js'
  ],
  outputFile: '/js/vendor.js'
});

var js = compileES6('app/assets/js', {
  inputFiles: [
    '**/*.js'
  ],
  legacyFilesToAppend: [],
  wrapInEval: environment !== 'development',
  outputFile: '/js/app.js'
});

var vendorCSS = concatTree(assets, {
  inputFiles: [
    'vendor/font-awesome/css/font-awesome.css',
    'vendor/bootstrap/dist/css/bootstrap.css',
    'vendor/toastr/toastr.css'
  ],
  outputFile: '/css/vendor.css'
});

var css = filterSass(
  [assets],
  'sass/main.scss',
  'css/app.css',
  {
    imagePath: 'public/img',
    outputStyle: environment === 'development' ? 'expanded' : 'compressed',
    sourceComments: environment === 'development',
    sourceMap:  environment !== 'development'
  }
);

var fonts = pickFiles(assets, {
  srcDir: 'vendor/font-awesome/fonts',
  files: [
    'fontawesome-webfont.eot',
    'fontawesome-webfont.ttf',
    'fontawesome-webfont.svg',
    'fontawesome-webfont.woff'
  ],
  destDir: '/fonts'
});

var img = pickFiles(assets, {
  srcDir: 'img',
  files: [
    // Uncomment as needed.
    // '**/*.gif',
    // '**/*.jpg',
    '**/*.png'
  ],
  destDir: '/img'
});

if (environment === 'production') {
  vendorCSS = cleanCSS(vendorCSS);
  vendorJS = uglifyJS(vendorJS);
  css = cleanCSS(css);
  js = uglifyJS(js);
}

module.exports = mergeTrees(
  [
    vendorJS,
    js,
    vendorCSS,
    css,
    fonts,
    img
  ],
  {
    overwrite: true
  }
);
