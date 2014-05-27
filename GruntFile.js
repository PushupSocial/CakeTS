module.exports = function (grunt) {
    // Prepare our gtx wrapper
    var gtx = require('gruntfile-gtx').wrap(grunt);

    // Load our npm task dependencies
    gtx.loadNpm([
        'grunt-contrib-uglify',
        'grunt-typescript',
        'grunt-tslint',
        'grunt-karma',
        'grunt-contrib-copy'
    ]);

    // Load up our configuration
    gtx.config({
        typescript: {
            base: {
                src: ["src/**/*.ts"],
                dest: "build/CakeTS.js",
                options: {
                    "target": "es5",
                    "sourceMap": true
                }
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    inSourceMap: "build/CakeTS.js.map",
                    sourceMapName: "build/CakeTS.min.js.map",
                    mangle: true,
                    beautify: false,
                    compress: true
                },
                files: {
                    'build/CakeTS.min.js': 'build/CakeTS.js'
                }
            }
        },
        tslint: {
            options: {
                configuration: gtx.readJSON("./tslint.json")
            },
            files: {
                src: 'src/**/*.ts'
            }
        },
        copy: {
            dist: {
                files: [
                    {src: 'build/*', dest: 'dist', expand: true, flatten: true}
                ],
                options: {
                    noProcess: true
                }
            }
        },
        karma: {
            build: {
                options: {
                    files: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/knockout/dist/knockout.js',
                        'bower_components/Typertext/build/typertext.js',
                        'build/CakeTS.js',
                        'tests/**/*.js'
                    ]
                },
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'ERROR',
                frameworks: ['jasmine']
            },
            debug: {
                options: {
                    files: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/knockout/dist/knockout.js',
                        'bower_components/Typertext/build/typertext.js',
                        'build/CakeTS.js',
                        'tests/**/*.js'
                    ]
                },
                runnerPort: 9999,
                singleRun: false,
                browsers: ['Chrome'],
                logLevel: 'ERROR',
                frameworks: ['jasmine']
            }
        }
    });

    // Define our usable tasks
    gtx.alias('default', ['build']);
    gtx.alias('build', ['typescript', 'uglify']);
    gtx.alias('dist', ['tslint', 'build']);

    // Initialize grunt
    gtx.finalise();
};