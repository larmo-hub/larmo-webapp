module.exports = function(grunt) {
    var jsFiles = [
        'assets/js/app.js',
        'assets/js/config.js',
        'assets/js/lang/*.js',
        'assets/js/filters/*.js',
        'assets/js/controllers/*.js',
        'assets/js/services/*.js'
    ];

    var sassFiles = [
        'assets/styles/main.scss'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'uglify': {
            'js': {
                'src': jsFiles,
                'dest': 'build/application.min.js'
            }
        },
        'sass': {
            dist: {
                options: {
                    'style': 'compressed'
                },
                files: {
                    'build/style.min.css': sassFiles
                }
            },
            dev: {
                options: {
                    'style': 'expanded'
                },
                files: {
                    'build/style.css': sassFiles
                }
            }
        },
        'includeSource': {
            dev: {
                files: {
                    'build/scripts.html': 'views/dev_scripts.tpl.html',
                    'build/external_scripts.html': 'views/external_scripts.tpl.html'
                }
            },
            production: {
                files: {
                    'build/scripts.html': 'views/production_scripts.tpl.html',
                    'build/external_scripts.html': 'views/external_scripts.tpl.html'
                }
            }
        },
        'watch': {
            'js': {
                'files': jsFiles,
                'tasks': ['includeSource:dev']
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
            commitVersionBump: {
                command: function(version) {
                    return 'git add package.json; git commit -m \'Updated version to ' + version + ' in package.json\'';
                }
            },
            createReleaseForProduction: {
                command: function(version) {
                    grunt.task.run("production");

                    return 'git checkout -b release-' + version + ';' +
                        'git add -f build/*;' +
                        'git commit -am \'Added compiled assets for production version \'' + version + '; ' +
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
    grunt.registerTask('build', ['sass:dev', 'includeSource:dev']);
    grunt.registerTask('development', ['build', 'concurrent:dev']);
    grunt.registerTask('production', ['sass:dist', 'uglify', 'includeSource:production']);
    grunt.registerTask('release', "Release new version", function(type) {
        var pkg, version;

        if(type === undefined) {
            type = 'patch';
        }

        // Increase version in package.json
        grunt.task.run('version_bump:' + type);

        // Get new version from package.json
        pkg = grunt.file.readJSON('package.json');
        version = pkg.version;

        // Commit new package version
        grunt.task.run("shell:commitVersionBump");

        // Create new tag with
        grunt.task.run("shell:createReleaseForProduction:version");
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
