require(['jquery', 'storage'], function($, storage) {

    //缓存元素
    var _setWrap = $(".set-wrap");

    //点击内容
    $(".artical-con").on("click", function() {
        _setWrap.show();
    })

    //点击mask
    $(".mask").on("click", function() {
        _setWrap.hide();
        $(".set-panel").hide();
        $(".font-btn").removeClass("active");
    })

    //点击字体
    $(".font-btn").on("click", function() {
        $(".set-panel").toggle();
        $(this).toggleClass("active");
    })

    var initFz = storage.get("fz") || 14,
        maxFz = 30,
        minFz = 10; //初始12

    $(".artical-con p").css("font-size", initFz / 37.5 + "rem");

    //点击大
    $(".large-btn").on("click", function() {
        if (initFz < maxFz) {
            initFz += 2;
        }
        //转换rem
        $(".artical-con p").css("font-size", initFz / 37.5 + "rem");
        storage.set("fz", initFz);
    })

    //点击小
    $(".small-btn").on("click", function() {
        if (initFz > minFz) {
            initFz -= 2;
        }
        //转换rem
        $(".artical-con p").css("font-size", initFz / 37.5 + "rem");
        storage.set("fz", initFz);
    })

    //设置背景
    $(".bg-btns").on("click", "li", function() {
        var bg = $(this).attr("data-bg");
        $(this).addClass("active").siblings().removeClass("active");
        $(".artical-con").css("background-color", bg);
    })

    var status = true; //白天的状态

    //切换白天黑夜
    $(".day-btn").on("click", function() {
        if (status) {
            $(this).addClass("light");
            $(this).children("dd").html("白天");
        } else {
            $(this).removeClass("light");
            $(this).children("dd").html("夜间");
        }
        status = !status;
    })
})