require(['jquery', 'swiper', 'bscroll', 'direction', 'render', 'text!bookTB', 'text!bookLR'], function($, swiper, bscroll, direction, render, bookTB, bookLR) {
    $("body").append(bookTB);
    $("body").append(bookLR);
    var pagenum = 1, //初始加载第一页
        more = true, //是否有更多数据
        num = 0, //重磅推荐默认显示前五条
        len, //重磅推荐有几组数据 
        recommend; //格式化重磅推荐数据

    $.ajax({
        url: '/api/home',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            //分类
            var typeArr = [];
            res.items[0].data.data.forEach(function(item) {
                if (item.size === 0) {
                    typeArr.push(item);
                }
            });
            console.log(typeArr)
            render("#type-tpl", ".types", typeArr);

            // 本周最火
            render("#book-t-b", ".top-list", res.items[1].data.data);

            //重磅推荐
            recommend = format(res.items[2].data.data);
            len = recommend.length;
            renderRecommend(recommend[num]);
            $(".content").show();
            $(".top-list").on("click", "li", function() {
                var fiction_id = $(this).attr("data-id");
                location.href = "../../page/detail.html?fiction_id=" + fiction_id;
            })
        },
        error: function(error) {
            console.warn(error)
        }
    })

    //格式化数组
    function format(data) {
        //一维数组 转二维数组
        var i = 0;
        var target = [];
        data.forEach(function(item, index) {
            if (!target[i]) {
                target[i] = [];
            }
            var ind = index + 1;
            target[i].push(item);
            if (ind % 5 === 0) {
                i++;
            }
        })
        return target
    }

    //渲染重磅推荐
    function renderRecommend(data) {
        render("#book-l-r-tpl", ".l-f-list", data, true);
    }

    //点击换一换
    $(".change-btn").on("click", function() {
        num++;
        if (num == len) {
            num = 0;
        }
        renderRecommend(recommend[num]);
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
            if (more) {
                _parent.attr("up", "释放加载更多");
            } else {
                _parent.attr("up", "没有更多");
            }
        } else if (this.y < this.maxScrollY - hei / 2) {
            if (more) {
                _parent.attr("up", "上拉加载");
            } else {
                _parent.attr("up", "没有更多");
            }
        } else if (this.y > hei) {
            _parent.attr("down", "释放刷新")
        }
    })

    cityBscroll.on("touchEnd", function() {
        if (_parent.attr("up") === "释放加载更多") {
            console.log("加载下一页");
            if (more) {
                pagenum++;
                loadMore();
                _parent.attr("up", "上拉加载");
            } else {
                _parent.attr("up", "没有更多");
            }
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

    //上拉加载

    function loadMore() {
        $.ajax({
            url: '/api/loadMore',
            data: {
                pagenum: pagenum,
                count: 10
            },
            dataType: 'json',
            success: function(res) {
                console.log(res);
                if (!res.more) {
                    more = false
                }
                render("#l-r-tpl", ".loadmore", res.items);
                cityBscroll.refresh();
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }
    loadMore();

    //点击类别
    $(".types").on("click", "dl", function() {
        location.href = "../../page/list.html";
    })



})

//接口地址：/api/loadMore
//接口说明： 首页加载更多
//传参:         数据类型     默认值    说明
//pagenum       Number        1       页数
//count         Number        10      每页的条数  
//请求方式：get
//返回数据