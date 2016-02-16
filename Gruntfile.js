module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({
      jasmine_nodejs: {
        // task specific (default) options
        apple: {
            specNameSuffix: "microgearSpec.js", // also accepts an array
            helperNameSuffix: "publish_helper.js",
            useHelpers: true,
            stopOnFailure: false,
            // configure one or more built-in reporters
            reporters: {
              console: {
                colors: true,
                    cleanStack: 1,       // (0|false)|(1|true)|2|3
                    verbosity: 4,        // (0|false)|1|2|3|(4|true)
                    listStyle: "indent", // "flat"|"indent"
                    activity: false
                  },
                },
            // add custom Jasmine reporter(s)
            customReporters: []
          },
          your_target: {
            // target specific options
            options: {
              useHelpers: true
            },
            // spec files
            specs: [
            "spec/**"
            ],
            helpers: [
            "helper/**"
            ]
          }
        },
     
        });

    // Load required modules
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');
    // grunt.loadNpmTasks('grunt-contrib-jasmine');
    // grunt.loadNpmTasks('grunt-template-jasmine-requirejs');

    // Task definitions
    // grunt.registerTask('default', ['concat']);
    grunt.registerTask('default', 'jasmine_nodejs:apple');

  };

