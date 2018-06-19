define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(source, target, data, isHtml) {
        var tpl = $(source).html();

        var template = handlebars.compile(tpl);

        var html = template(data);

        if (isHtml) {
            $(target).html(html);
        } else {
            $(target).append(html);
        }

    }
    return render
})