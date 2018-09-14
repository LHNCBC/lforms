// Generated on 2014-10-20 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    karma: 'grunt-karma',
    ngtemplates: 'grunt-angular-templates',
    protractor: 'grunt-protractor-runner'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var wiredep = require('wiredep');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    compress: {
      main: {
        options: {
          archive: '<%= uncompressedDist %>.zip'
        },
        files: [{
          src: ['<%= versionedName %>/**'],
          cwd: 'dist',
          expand: true
        }]
      }
    },


    cssmin: {
      dist: {
        files: [{
          src: wiredep({includeSelf: true}).css.concat(
            'bower_components/bootstrap/dist/css/bootstrap.css'),
          dest: '<%= uncompressedDist %>/styles/lforms.min.css'
        }]
      }
    },


    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'app/styles/themes.css': 'app/styles/themes.scss'
        }
      }
    },

    shell: {
      dist_dir_link: {
        // Make a softlink to the versioned dist directory, for the tests
        command: 'ln -s <%= versionedName %> latest',
        options: {
          execOptions: {
            cwd: 'dist'
          }
        }
      },
      webpack: {
        command: 'webpack',
      }
    },


    ngtemplates:  {
      lformsWidget:        {
        cwd: '<%= yeoman.app %>/views/partials',
        src: '{,*/}*.html',
        dest: '<%= yeoman.app %>/lforms.tpl.js'
      }
    },

    directivejs: {

    },

    directivecss: {

    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/mocha/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9002,
        // Change this to '0.0.0.0' to access the server from outside.
        //hostname: 'localhost',
        hostname: '0.0.0.0',
        livereload: 35731
      },
      livereload: {
        options: {
          //open: true,
          open: {
            target: '<%= connect.options.hostname %>:<%= connect.options.port %>',
            appName: 'firefox'
          },
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },


    nsp: {
      package: grunt.file.readJSON('./package.json'),
      shrinkwrap: grunt.file.readJSON('./npm-shrinkwrap.json')
    },


    protractor: {
      options: {
        configFile: "test/protractor/conf.js", // Default config file
        // If keepAlive it true, grunt test finishes with the statement "Done,
        // without errors" even when there are errors.
        //keepAlive: true // If false, the grunt process stops when the test fails.
      },
      all: {
        options: {
          args: {
            // browser: 'firefox' // this is set in configFile
          }
        }
      }
    },


    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        options: {
          includeSelf: true,
          ignorePath:  /\.\.\//
        },
        src: ['<%= yeoman.app %>/index.html',
              '<%= yeoman.app %>/test/lforms_testpage.html',
              '<%= yeoman.app %>/test/directiveTest.html',
              '<%= yeoman.app %>/test/directiveAttrTest.html']
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    uglify: {
      // options: { beautify: true, mangle: false }, // debugging only
      dist: {
        files: {
          // This will include dependencies, including jQuery
          '<%= uncompressedDist %>/lforms.min.js':
            wiredep({includeSelf: true}).js,
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= uncompressedDist %>',
          src: [
            'images/{,*/}*'
          ]
        }, {
          expand: true,
          dest: '<%= uncompressedDist %>/styles',
          cwd: 'bower_components/jquery-ui/themes/start',
          src: [
            'images/*png'
          ]
        }, {
          expand: true,
          dest: '<%= uncompressedDist %>',
          cwd: 'bower_components/bootstrap/dist',
          src: [
            'fonts/*'
          ]
        }, {
          expand: true,
          dest: '<%= uncompressedDist %>/styles',
          cwd: 'bower_components/autocomplete-lhc/source',
          src: [
            '*png'
          ]
        }, {
          expand: true,
          dest: '<%= uncompressedDist %>/',
          cwd: 'app/scripts/fhirpath',
          src: [
            'fhirpath.min.js'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'sass',
      'ngtemplates',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });


  grunt.registerTask('test:server', [
    'karma'
  ]);

  grunt.registerTask('test:e2e', [
    'clean:server',
    'ngtemplates',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'wiredep',
    'protractor'
  ]);

  grunt.registerTask('test', [
    'karma',
    'build',
    'test:e2e',
    'nsp'
  ]);

  grunt.registerTask('readBowerVersion', function () {
    var bowerVersion = grunt.file.readJSON('./bower.json').version;
    var versionedName = 'lforms-'+bowerVersion;
    grunt.config.set('versionedName', versionedName);
    grunt.config.set('uncompressedDist', 'dist/'+versionedName);
  });


  grunt.registerTask('build', [
    'clean:dist',
    'ngtemplates',
    'sass',
    'readBowerVersion',
    'shell:webpack',
    'copy:dist',
    'cssmin',
    'uglify',
    'compress',
    'shell:dist_dir_link'
  ]);

  grunt.registerTask('default', [
    //'newer:jshint',
    'test'
  ]);


  // This task is just for debugging the "uglify" configuration
  grunt.registerTask('listDepJS', function() {
    console.log("\n\n" + wiredep(
      {includeSelf: true}).js.join("\n"));
  });

  grunt.registerTask('listDepCSS', function() {
    console.log("\n\n" + wiredep(
      {includeSelf: true}).css.join("\n"));
  });

};
