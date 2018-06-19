require(['jquery', 'swiper', 'bscroll', 'direction', 'render', 'text!bookTB'], function($, swiper, bscroll, direction, render, bookTB) {
    console.log(bookTB);
    $("body").append(bookTB);
    $.ajax({
        url: '/api/home',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            render("#book-t-b", ".top-list", res.items[1].data);

        },
        error: function(error) {
            console.warn(error)
        }
    })

    //滑动兼容处理  
    var startX, startY;
    document.addEventListener('touchstart', function(ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);
    document.addEventListener('touchend', function(ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direct = direction(startX, startY, endX, endY);
        switch (direct) {
            case 3:
                swiperFun(1);
                break;
            case 4:
                swiperFun(0);
                break;
            default:
        }
    }, false);

    //缓存元素
    var _line = $(".line"),
        _parent = $(".book-city>div");

    function swiperFun(activeIndex) {
        $(".tab-item").eq(activeIndex).addClass("active").siblings().removeClass("active");
        if (activeIndex == 1) {
            _line.addClass("move")
        } else {
            _line.removeClass("move")
        }
        wrapSwiper.slideTo(activeIndex);
    }

    //实例化bscroll

    var cityBscroll = new bscroll(".book-city", {
        probeType: 2,
        click: true,
        scrollY: true
    })

    var fz = $("html").css("font-size");
    console.log(parseInt(fz));
    var hei = parseInt(fz) * 37.5 / 44;

    cityBscroll.on("scroll", function() {
        if (this.y < this.maxScrollY - hei) {
            _parent.attr("up", "释放加载更多")
        } else if (this.y < this.maxScrollY - hei / 2) {
            _parent.attr("up", "上拉加载")
        } else if (this.y > hei) {
            _parent.attr("down", "释放刷新")
        }
    })

    cityBscroll.on("touchEnd", function() {
        if (_parent.attr("up") === "释放加载更多") {
            console.log("加载下一页");
            _parent.attr("up", "上拉加载")
        } else if (_parent.attr("down") === "释放刷新") {
            location.reload();
        }
    })

    //实例化wrap-swiper
    var wrapSwiper = new swiper('.wrap-swiper');

    //点击tab
    $(".tab").on("click", ".tab-item", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var ind = $(this).index();

        if (ind == 1) {
            _line.addClass("move");
        } else {
            _line.removeClass("move");
        }
        wrapSwiper.slideTo(ind);
    })

})