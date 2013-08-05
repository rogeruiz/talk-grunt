## Rokkan Talks Grunt

Quit running your tasks manually and have Grunt run them for you.

More information on [Grunt][gruntjs]

---

### Outline

##### Introduction
Tools are great. They help us write faster CSS. Others make our code more efficient
and compact. Some compress PNG and JPG files for us so they'll be smaller without
losing any quality. Other's encourage documentation by allowing you to construct
HTML pages using other simpler languages such as Markdown. Some do linting of our
PHP and JS files in order to mak sure that we don't commit code that could potentially
break on the server or in the browser.

There are issues with having this many tools, though. We spend so much time running
a forked list of things that need to be constantly running in the background in
order to compile our code for the browser. We write out our `readme` files in
Markdown but never bother compiling them to HTML to serve them up in the browser.
We know we should be compressing and minifying our image, js, and css assets.
But if there is a deadline, we're often leaving that to the last minute if we get
a chance to do it at all.

_Tools are great._ __But, tools are also a hassle.__

- Compass requires `compass watch` to be running at the root of the working directory.
- PHPLint and JSHint require either `php -l [file]` or `jshint [file]` to be run each and every time you save your files.
- Markdown conversion is made easy by having a markdown parse do things for you, but which one do we use and when?
- Compressing image files is great, but we have to remember to do it whenever we add images to the repository.
- The latest CLI tool which does XYZ better than ABC and should be run under specific file-change conditions.
- That little tool in your belt that you love to use, but hate running because of the carpel tunnel.
- Building out assets for easier delivery to clients or production servers.

How do we deal with our current workflow, the workflow of the future, and getting
new developers up to speed with our present and future workflows?

##### What is Grunt?
Enter Grunt.

Grunt is a javascript task runner built on top of Node.

> Why use a task runner? In one word: automation. The less work you have to do when
> performing repetitive tasks like minification, compilation, unit testing, linting,
> etc, the easier your job becomes. After you've configured it, a task running can
> do most of that mundane work for you—and your team—with basically zero effort. [source][gruntjs]

It's a Node application. It runs what you want it to when you want it to. The
configuration all happens in JSON, so it's easy to write and understand.
Simple as that.

> Why use Grunt? The Grunt ecosystem is huge and it's growing every day. With literally
> hundreds of plugins to choose from, you can use Grunt to automate just about anything
> with a minimum of effort. If someone hasn't already built what you need, authoring
> and publishing your own Grunt plugin to npm is a breeze. [source][gruntjs]

##### Setting up Grunt

To use Grunt, we first need to install [Nodejs][nodejs]. You may already have it
installed, but if not it's pretty simple to do.

> Download the Node.js source code or pre-built installer for your platform, and
> start developing today. [source][nodejs-download]

Once Node is up and running, the next is the `grunt-cli` in order to have the
grunt command available anywhere.

```shell
npm install -g grunt-cli
```

You may need to run the console as Adminstrator on Windows or use `sudo` in the
terminal on Mac.

> This will put the `grunt` in your system path, allowing it to be run from any directory.
>
> Note that installing `grunt-cli` does not install the grunt task runner! The job
> of the grunt CLI is simple: run the version of grunt which has been installed
> next to a `Gruntfile`. This allows multiple versions of grunt to be installed on
> the same machine simultaneously. [source][gruntjs-getting-started]

With those two dependencies out of the way, you're ready to start using Grunt.
If you'd like to learn more about using Grunt and setting up a project, please
read the [Getting Started][gruntjs-getting-started] guide.

First, install the projects dependencies. In this case, it's Grunt and the
particular Grunt plugins you want to use.

```shell
npm install
```

This will install all the dependencies listed in the project's `package.json`
file. More information about this file can be found [here][gist_package.json].

Once those are installed, you can start using Grunt with all the configurations
specified in the [Gruntfile.js][gist_Gruntfile.js] file.

```shell
grunt
```

##### Working into the Rokkan workflow

The best part of using Grunt is the community support behind it. There are tons
of plugins that have already been contributed to the project. Most of them are
interfaces for tools we already use:

- [Compass](https://npmjs.org/package/grunt-contrib-compass)
- [Watch](https://npmjs.org/package/grunt-contrib-watch)
- [Markdown](https://github.com/treasonx/grunt-markdown)
- [Imagemin](https://npmjs.org/package/grunt-contrib-imagemin)
- [JSHint](https://npmjs.org/package/grunt-contrib-jshint)
- [Concat](https://npmjs.org/package/grunt-contrib-concat)
- [Uglify](https://npmjs.org/package/grunt-contrib-uglify)
- [A lot more][gruntjs-plugins]

These tools do what you already know them to do. And are pretty simple to set up
within a `Gruntfile.js`.

Here's Compass for example:

```js
// ...
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
}
// ...
```

Once that's set up, the Grunt commands for using them are exposed in the command
line as:

```shell
grunt compass:dist
```

or

```shell
grunt compass:dev
```

##### How Rokkan uses Grunt

Dominic, Dan, and myself have been using Grunt. It's help use do just about everything
we've needed to do within a project. Compass compilation, documentation creation,
minifying js, concating it, and setting up deploy folders.

Here's a look at the Gruntfile.js for each project:

###### Rokkan-MainWebsite2013
Available tasks: `grunt uglify` 
```js
grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'js/build/script.js': ['js/script.js'],
        'js/build/plugins.js': ['js/plugins.js']
      }
    }
  }
});
```

###### Stoli-OrgnlTv
Available tasks: `grunt compass`, `grunt uglify`, or `grunt watch`
```js
grunt.initConfig({
  compass: {
    dev: {
      options: {
        config: 'config.rb',
        force: true
      }
    }
  },
  uglify: {
    my_target: {
      files: [ {
        src: ['assets/js/site/plugins.js', 'assets/js/site/main.js'],
        dest: 'assets/js/site/main.min.js'
      } ]
    }
  },
  watch: {
    sass: {
      files: ['assets/sass/**/*.scss'],
      tasks: ['compass:dev']
    },
    /* watch and see if our javascript files change, or new packages are installed */
    js: {
      files: ['assets/js/site/*.js'],
      tasks: ['uglify', 'uglify:my_target']
    },
    /* watch our files for change, reload */
    livereload: {
      files: ['*.html', 'assets/css/site/*.css', 'assets/images/*', 'assets/js/site/main.min.js'],
      options: {
        livereload: true
      }
    }
  }
});
```

###### Evil Within
Available tasks: `grunt uglify`, `grunt copy`, or `grunt compass`
```js
  grunt.config.init({
    //... Grab it from the Lamp Repo
});
```

###### WellPoint-RealHealthSite
Available tasks: `grunt watch`, `grunt qunit`, `grunt phpunit`, `grunt requirejs:dev`,
`grunt requirejs:dist`, `grunt imagemin`, `grunt compass:dev`, `grunt compass:dist`,
`grunt markdown` or `grunt jshint`
```js
grunt.config.init({
  pkg: grunt.file.readJSON('package.json'),
  qunit: {
    all: ['tests/*.html']
  },
  exec: {
    phpunit: {
      cmd: 'phpunit tests'
    }
  },
  watch: {
    scripts: {
      files: ['web/js/lib/*.js', 'web/js/src/*.js'],
      tasks: ['requirejs:dev']
    },
    stylesheets: {
      files: ['web/scss/lib/*.scss', 'web/scss/src/*.scss'],
      tasks: ['compass:dev']
    },
    docs: {
      files: ['*.markdown', 'docs/src/*.markdown'],
      tasks: ['markdown']
    },
    qunit: {
      files: ['tests/**/*.html', 'tests/**/*.js', 'web/src/app.js'],
      tasks: ['qunit']
    },
    phpunit: {
      files: ['tests/**/*.php'],
      tasks: ['exec:phpunit']
    }
  },
  requirejs: {
    dist: {
      options: {
        baseUrl: "web/js",
        name: "src/main",
        paths: {
          "src": "src",
          "jquery": "lib/jquery"
        },
        out: "web/js/app.js",
        optimize: 'uglify2',
        preserveLicenseComments: false,
        generateSourceMaps: true,
        compress: {
          dead_code: true,
          unused: true
        }
      }
    },
    dev: {
      options: {
        baseUrl: "web/js",
        name: "src/main",
        paths: {
          "src": "src",
          "jquery": "lib/jquery"
        },
        out: "web/js/app.js",
        optimize: 'none'
      }
    }
  },
  imagemin: {
    dist: {
      options: {
        optimizationLevel: 3
      },
      files: [{
        expand: true,
        cwd: 'web/img',
        src: ['*.png'],
        dest: 'web/img',
        ext: '.png'
      },{
        expand: true,
        cwd: 'web/img',
        src: ['*.jpg'],
        dest: 'web/img',
        ext: '.jpg'
      },{
        expand: true,
        cwd: 'web/img',
        src: ['*.jpeg'],
        dest: 'web/img',
        ext: '.jpeg'
      }]
    }
  },
  compass: {
    dist: {
      options: {
        config: 'config/compass.rb',
        outputStyle: 'compressed',
        noLineComments: true,
        environment: 'production'
      }
    },
    dev: {
      options: {
        config: 'config/compass.rb',
        outputStyle: 'expanded',
        noLineComments: false,
        environment: 'development'
      }
    }
  },
  markdown: {
    docs: {
      files: [
        {
          expand: true,
          cwd: 'docs/src',
          src: ['*.markdown'],
          dest: 'docs',
          ext: '.html'
        }
      ],
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
        'docs/index.html': ['README.markdown']
      },
      options: {
        template: 'docs/src/index.markdown.jst',
        markdownOptions: {
          gfm: true,
          highlight: 'manual'
        }
      }
    }
  },
  jshint: {
    files: ['Gruntfile.js', 'web/js/src/*.js', 'tests/tests.js'],
    options: {
      ignores: ['web/js/lib/*.js', 'web/js/app.js']
    }
  }
});
```

##### Endless possibilities

Wouldn't it be great if you could update your workflow with new tools easily?
Using Grunt you can do just that. Next time you see a new tool come out that
you'd like to try on a project, you can just add it to your `Gruntfile.js` and
give it a try. No headaches, no problems.

Find out that you need to minify things and copy files everytime you update something?
Grunt can easily be configured to do that.

Check out the [plugins page][gruntjs-plugins] for all of the ways you
can add new functionality to Grunt. There are already a ton of plugins there.

There is also a `grunt-init` scaffolding tool used to automate project creation.
A tool like this can be built for every different type of Rokkan project, present
and future, and standardize and minimize our startup process. More information
about this tool can be found [here][gruntjs-project-scaffolding].

##### Thanks

So that's the basics for using Grunt with some opinionated workflow suggestions.
We have a few developers already using Grunt in various ways. Feel free to ask
them to go more in-depth about their workflow. Thanks!

[gruntjs]: http://grunt.js.com/
[gruntjs-getting-started]: http://grunt.js.com/getting-started
[gruntjs-project-scaffolding]: http://gruntjs.com/project-scaffolding
[gruntjs-plugins]: http://gruntjs.com/plugins
[nodejs]: http://nodejs.org/
[nodejs-download]: http://nodejs.org/download/
[gist_package.json]: https://gist.github.com/rogeruiz/6140992#file-package-json
[gist_Gruntfile.js]: https://gist.github.com/rogeruiz/6140992#file-gruntfile-js
[gist_bower.json]: https://gist.github.com/rogeruiz/6140992#file-bower-json