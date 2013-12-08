module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
      
        watch: {
            options: {
                livereload: true 
            },
            compass: {
                files: ['public/sass/**/*.{scss,sass}'],
                tasks: ['compass']
            },
            // js: {
                // files: '<%= jshint.all %>',
                // tasks: ['jshint', 'uglify']
            // },
            livereload: {
                files: ['views/**/*.jade', 'public/**/*.js', 'public/**/*.css', 'public/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },
        
        // compass and scss
        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true
            },
            all: [
                'Gruntfile.js',
                'public/js/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps

        uglify: {
            dist: {
                options: {
                    sourceMap: 'public/js/map/source-map.js',
                    banner: '/*\n  <%= pkg.name %> v<%= pkg.version %>\n  Developer & Designer: <%= pkg.author %> \n  <%= pkg.authorURL %>\n' 
                            +
                            '  <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
                },
                files: {
                    'public/js/main.min.js': [
                        'public/**/*.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'public/images/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'public/images/min/'
                }]
            }
        },

        nodemon: {
          dev: {
            options: {
              file: 'app.js',
              nodeArgs: ['--debug'],
              ignoredFiles: ['node_modules/**'],
              watchedExtensions: ['js'],
              delayTime: 1,
              legacyWatch: true,
              env: {
                PORT: '1337'
              },
              cwd: __dirname
            }
          }
        },

        concurrent: {
          dev: {
            tasks: ['nodemon', 'watch'],
            options: {
              logConcurrentOutput: true
            },
            watch: [
                'watch:scripts',
                'watch:styles',
                'watch:livereload',
            ],
          }
        }

    });

    grunt.registerTask('default', ['concurrent']);
};
