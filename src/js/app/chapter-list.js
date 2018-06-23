require(['jquery', 'bscroll', 'render', 'getRequest'], function($, bscroll, render, getRequest) {
    var fiction_id = getRequest().fiction_id;
    $.ajax({
        url: '/api/chapter',
        data: {
            fiction_id: fiction_id
        },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            render("#chapter-template", ".chapter-list", res.item.toc);
            var chapterScroll = new bscroll(".chapter-wrap", {
                click: true
            })

            var last = $(".chapter-list li").length - 1;
            chapterScroll.scrollToElement($(".chapter-list li").eq(last)[0]);
            $(".chapter-list li").eq(last).addClass("active");
        },
        error: function(error) {
            console.warn(error)
        }
    })

    $(".icon-back").on("click", function() {
        history.go(-1);
    })
})

//接口的地址  /api/chapter
//接口说明   请求目录的
//参数            数据类型    默认值
//fiction_id        Number     无

//请求方式  get

//success  返回数据