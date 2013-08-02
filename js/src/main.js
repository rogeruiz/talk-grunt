require(['bespoke'], function (bespoke) {
    bespoke.vertical.from('article');

    var verticalCenter = function (el) {
        var offSetHeight = ((el.height())- window.outerHeight / 2 );
        el.find('.inner').css({
            'top': '' + Math.ceil(offSetHeight) + 'px'
        });
    }

    verticalCenter($('.bespoke-active'));
    bespoke.on('activate', function (e) {
        verticalCenter($(e.slide));
    });

});