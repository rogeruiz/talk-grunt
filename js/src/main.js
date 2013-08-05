bespoke.vertical.from('article', {
    hash: true
});

var verticalCenter = function (el) {
    var offSetHeight = ((window.outerHeight - el.find('> .inner').height()) * 0.35 );
    el.find('> .inner').css({
        'top': '' + Math.ceil(offSetHeight) + 'px'
        // 'height': '' + Math.ceil(window.outerHeight - 40) + 'px'
    });
}

verticalCenter($('.bespoke-active'));
bespoke.on('activate', function (e) {
    verticalCenter($(e.slide));
});