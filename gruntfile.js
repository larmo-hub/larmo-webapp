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
        pkg: grunt.file.readJSON('package.json'),
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
        },
        'nodemon': {
            dev: {
                script: 'index.js'
            }
        },
        concurrent: {
            dev: {
                tasks   : ['nodemon', 'watch'],
                options : {
                    logConcurrentOutput: true
                }
            }
        },
        shell: {
            createReleaseForProduction: {
                command: function(version) {
                    if(version === undefined) {
                        version = '<%= pkg.version %>';
                    }

                    return 'git checkout -b release-' + version + ';' +
                        'git add -f public/css/style.min.css public/js/application.min.js;' +
                        'git commit -am \'Saved for release\'; ' +
                        'git tag -a ' + version + ' -m \'Release ' + version + '\'; ' +
                        'git checkout master; git branch -D release-' + version + '; ';
                }
            }
        },
        version_bump: {
            files: ['package.json']
        }
    });

    grunt.registerTask('default', ['development']);
    grunt.registerTask('development', ['sass:dev', 'includeSource', 'concurrent:dev']);
    grunt.registerTask('release', "Release new version", function(type) {
        if(type === undefined) {
            type = 'patch';
        }

        grunt.task.run('version_bump:' + type);
        grunt.task.run("sass:dist");
        grunt.task.run("uglify");
        grunt.task.run("shell:createReleaseForProduction");
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-version-bump');
};
