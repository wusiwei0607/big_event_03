// 统一配置 Ajax 选项
var baseUrl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    // 更改url
    options.url = baseUrl + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 身份拦截
    options.complete = function (res) {
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            // 删除token
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
        }
    }
})