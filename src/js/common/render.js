define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(source, target, data, isHtml) {
        var tpl = $(source).html();

        var template = handlebars.compile(tpl);

        var html = template(data);

        handlebars.registerHelper("first", function(index) {
            console.log(index)
            return index === 0
        })
        handlebars.registerHelper("addInd", function(index) {
            return index + 1
        })

        if (isHtml) {
            $(target).html(html);
        } else {
            $(target).append(html);
        }

    }
    return render
})