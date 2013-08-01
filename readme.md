## A Rokkan Talk about Grunt
##### Grunt is a Javascript task runner

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
We know we should be  compressing and minifying our image, js, and css assets,
but if there is a deadline we're often leaving that to the last minute if we get
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
new developers up to speed with our workflow?

##### What is Grunt?
Enter Grunt.

Grunt is a javascript task runner built on top of Node.

> Why use a task runner? In one word: automation. The less work you have to do when
> performing repetitive tasks like minification, compilation, unit testing, linting,
> etc, the easier your job becomes. After you've configured it, a task running can
> do most of that mundane work for you—and your team—with basically zero effort. [source][gruntjs]

> Why use Grunt? The Grunt ecosystem is huge and it's growing every day. With literally
> hundreds of plugins to choose from, you can use Grunt to automate just about anything
> with a minimum of effort. If someone hasn't already built what you need, authoring
> and publishing your own Grunt plugin to npm is a breeze. [source][gruntjs]

It's a Node application. It runs what you want it to. Simple as that.

##### Setting up Grunt\
##### Popular Plugins
##### How Rokkan uses Grunt
##### Proposed plugins
##### Thanks

[gruntjs]: http://grunt.js.com