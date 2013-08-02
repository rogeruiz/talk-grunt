module.exports = function (grunt) {

    // Configure Grunt...
    grunt.config.init({
        watch: {
            stylesheets: {
                files: ['scss/**/*.scss'],
                tasks: ['compass:dev']
            },
            docs: {
                files: ['*.md', 'docs/src/*.md'],
                tasks: ['markdown']
            }
        },
        requirejs: {
            options: {
                baseUrl: 'js/lib',
                mainConfigFile: 'js/src/config.js',
                path: {
                    'src': '../src'
                },
                out: 'js/app.js'
            },
            dev: {
                options: {
                    optimize: 'none'
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['*.png'],
                    dest: 'img',
                    ext: '.png'
                }, {
                    expand: true,
                    cwd: 'img',
                    src: ['*.jpg'],
                    dest: 'img',
                    ext: '.jpg'
                }, {
                    expand: true,
                    cwd: 'img',
                    src: ['*.jpeg'],
                    dest: 'img',
                    ext: '.jpeg'
                }]
            }
        },
        compass: {
            options: {
                basePath: './',
                sassDir: 'scss',
                cssDir: 'css',
                imagesDir: 'img',
                javascriptsDir: 'js',
                sassPath: 'scss',
                cssPath: 'css',
                imagesPath: 'img',
                javascriptsPath: 'js',
                noLineComments: false,
                force: true
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    outputStyle: 'expanded',
                    environment: 'development'
                }
            }
        },
        markdown: {
            docs: {
                files: [{
                    expand: true,
                    cwd: 'docs/src',
                    src: ['*.md'],
                    dest: 'docs',
                    ext: '.html'
                }],
                options: {
                    template: 'docs/src/article.markdown.jst',
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            },
            readme: {
                files: {
                    'docs/index.html': ['readme.md']
                },
                options: {
                    template: 'docs/src/index.markdown.jst',
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            }
        }
    });

    // Load Grunt plugins...
    grunt.task.loadNpmTasks('grunt-exec');
    grunt.task.loadNpmTasks('grunt-contrib-watch');
    grunt.task.loadNpmTasks('grunt-contrib-compass');
    grunt.task.loadNpmTasks('grunt-contrib-requirejs');
    grunt.task.loadNpmTasks('grunt-contrib-qunit');
    grunt.task.loadNpmTasks('grunt-contrib-imagemin');
    grunt.task.loadNpmTasks('grunt-markdown');

    // Register Grunt tasks...
    grunt.task.registerTask('default', ['watch']);
};