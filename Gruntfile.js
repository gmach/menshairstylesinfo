module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['lib/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'www/js/**/*.js', 'tests/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        qunit: {
            files: ['tests/**/*.html']
        },
        // grunt-express will serve the files from the folders listed in `bases`
        // on specified `port` and `hostname`
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "localhost",
                    bases: ['www'], // Replace with the directory you want the files served from
                    // Make sure you don't use `.` or `..` in the path as Express
                    // is likely to return 403 Forbidden responses if you do
                    // http://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
                    livereload: true
                }
            }
        },
        // grunt-open will open your browser at the project's URL
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        },
        // Metadata.
        meta: {
            basePath: 'www/css/',
            srcPath: 'www/css/',
            deployPath: 'www/css/'
        },
/*
        sass: {
            dist: {
                files: {
                    '<%= meta.deployPath %>main.css' : '<%= meta.deployPath %>main.scss',
                    '<%= meta.deployPath %>digital8.css' : '<%= meta.deployPath %>digital8.scss'
                }
            }
        },
*/
        compass: {
            dist: {
                options: {
                    sassDir: 'www/scss',
                    cssDir: 'www/css'
                }
            }
        },
        // grunt-watch will monitor the projects files
        watch: {
            scss: {
                files: ['www/scss/**/*.scss'],
                tasks: ['compass']
            },
            js: {
                files: ['www/js/**/*.js', 'www/tests/**/*.js'],
                tasks: ['jshint', 'qunit']
            },
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('server',[
        'express',
        'open',
        'watch'
    ]);
    // A very basic default task.
    grunt.registerTask('log', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('build', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('default', ['server']);
};