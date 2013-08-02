requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        src: '../src'
    },
    shim: {
        'bespoke': {
            exports: 'bespoke'
        }
    }
});