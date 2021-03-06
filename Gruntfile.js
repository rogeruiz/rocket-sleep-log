var config = {
  broccoli: {
    dist: {
      config: 'Brocfile',
      dest: 'public',
      env: 'production'
    },
    dev: {
      config: 'Brocfile',
      dest: 'public'
    }
  },
  watch: {
    options: {
      livereload: true
    },
    assets: {
      files: [
        'assets/sass',
        'assets/js',
        'assets/views',
        'public/img'
      ]
    }
  },
  exec: {
    expressDev: 'DEBUG=rocket-sleep-log PORT=3000 bin/www'
  }
};

module.exports = function(grunt) {
  config.pkg = grunt.file.readJSON('package.json');
  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('watch', [
    'exec:expressDev',
    // 'broccoli:dev:watch',
    // 'watch:assets'
  ]);
  grunt.registerTask('build', [
    'broccoli:dist:build'
  ]);
};
