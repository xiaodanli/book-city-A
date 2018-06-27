require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'swiper': './libs/swiper-3.4.2.min',
        'bscroll': './libs/bscroll',
        'handlebars': './libs/handlebars-v4.0.11',
        'text': './libs/text',
        'lazy': './libs/jquery.lazyload',
        'jsonp': './libs/jquery.jsonp',
        'base64': './libs/jquery.base64',

        //common
        'direction': './common/direction',
        'render': './common/render',
        'storage': './common/storage',
        'getRequest': './common/getRequest',

        //app
        'index': './index/index',
        'loadRefresh': './index/loadRefresh',
        'search': './search/index',
        'detail': './detail/index',
        'list': './list/index',
        'chapterList': './chapter-list/index',
        'artical': './artical/index',
        'login': './login/index',

        //模板
        'bookTB': '../page/tpl/book-t-b.html',
        'bookSearchTpl': '../page/tpl/book-l-r-s-list.html',
        'bookLR': '../page/tpl/book-l-r-list.html'

    },
    shim: {
        'lazy': {
            deps: ['jquery']
        },
        'base64': {
            deps: ['jquery']
        }
    }
})