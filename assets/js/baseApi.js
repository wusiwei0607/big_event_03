// 统一配置 Ajax 选项
var baseUrl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    // 更改url
    options.url = baseUrl + options.url
})