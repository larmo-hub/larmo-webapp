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
            },
            templates: {
                files: ['views/*.tpl.html'],
                tasks: ['includeSource:dev']
            }
        },
        concurrent: {
            dev: {
                tasks   : ['shell:startServer', 'watch'],
                options : {
                    logConcurrentOutput: true
                }
            }
        },
        shell: {
            startServer: {
                command: 'node index.js'
            },
            checkGitVersion: {
                command: 'git --version'
            },
            createCommitForPackage: {
                command: function(version) {
                    return [
                        'git add package.json',
                        'git commit -m "Updated version to ' + version + ' in package.json"'
                    ].join(' && ');
                }
            },
            createReleaseForProduction: {
                command: function(version) {
                    var commands = [
                        'git checkout -b release-' + version,
                        'git add -f build/*',
                        'git commit -am "Added compiled assets for production version ' + version + '"',
                        'git tag -a ' + version + ' -m "Release ' + version + '"',
                        'git checkout master',
                        'git branch -D release-' + version
                    ];

                    return commands.join(' && ');
                }
            }
        },
        version_bump: {
            files: ['package.json'],
            callback: function(version) {
                // Commit changed version in package.json
                grunt.task.run("shell:createCommitForPackage:" + version);

                // Apply changes and create new tag with
                grunt.task.run("shell:createReleaseForProduction:" + version);
            }
        }
    });

    function createNewRelease(type) {
        if(!type) {
            type = 'patch';
        }

        // Compile assets
        grunt.task.run("production");

        // If git isn't installed then do nothing
        grunt.task.run('shell:checkGitVersion');

        // Increase version in package.json
        grunt.task.run('version_bump:' + type);
    }

    grunt.registerTask('default', ['development']);
    grunt.registerTask('build', ['sass:dev', 'includeSource:dev']);
    grunt.registerTask('development', ['build', 'concurrent:dev']);
    grunt.registerTask('production', ['sass:dist', 'uglify', 'includeSource:production']);
    grunt.registerTask('release', "Release new version", createNewRelease);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-version-bump');
};
