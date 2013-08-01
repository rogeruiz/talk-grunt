module.exports = function (grunt) {

    // Configure Grunt...
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['js/lib/*.js', 'js/src/*.js'],
                tasks: ['requirejs:dev']
            },
            stylesheets: {
                files: ['scss/lib/*.scss', 'scss/src/*.scss'],
                tasks: ['compass:dev']
            },
            markdown: {
                files: ['*.md', 'docs/src/*.md'],
                tasks: ['markdown']
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
                },{
                    expand: true,
                    cwd: 'img',
                    src: ['*.jpg'],
                    dest: 'img',
                    ext: '.jpg'
                },{
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
                basePath: '/',
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
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-markdown');

    // Register Grunt tasks...
    grunt.task.registerTask('default', ['markdown']);
    grunt.task.registerTask('docs', ['markdown']);
};