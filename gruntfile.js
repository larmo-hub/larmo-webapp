module.exports = function(grunt) {
    var jsFiles = [
        'src/lang/*.js',
        'src/filters/*.js',
        'src/controllers/*.js',
        'src/services/*.js'
    ];

    var sassFiles = [
        'styles/main.scss'
    ];

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),
        'uglify': {
            'js': {
                'src': jsFiles,
                'dest': 'public/js/application.min.js'
            }
        },
        'sass': {
            dist: {
                options: {
                    'style': 'compressed'
                },
                files: {
                    'public/css/style.min.css': sassFiles
                }
            },
            dev: {
                options: {
                    'style': 'expanded'
                },
                files: {
                    'public/css/style.css': sassFiles
                }
            }
        },
        'includeSource': {
            myTarget: {
                files: {
                    'views/scripts_include/dev.html': 'views/dev_scripts_include.tpl.html'
                }
            }
        },
        'watch': {
            'js': {
                'files': jsFiles,
                'tasks': ['includeSource']
            },
            'css': {
                'files': ['styles/*.scss', 'styles/*/*.scss'],
                'tasks': ['sass:dev']
            }
        }
    });

    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['sass:dist', 'uglify', 'sass:dev', 'includeSource']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-include-source');
};
