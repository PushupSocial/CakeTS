module.exports = function (grunt) {
    // Prepare our gtx wrapper
    var gtx = require('gruntfile-gtx').wrap(grunt);

    // Load our npm task dependencies
    gtx.loadNpm([
        'grunt-contrib-uglify',
        'grunt-typescript',
        'grunt-tslint'
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
        }
    });

    // Define our usable tasks
    gtx.alias('default', ['build']);
    gtx.alias('build', ['typescript', 'uglify']);

    // Initialize grunt
    gtx.finalise();
};