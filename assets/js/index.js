$(function () {
    getUserInfo()
})

// 封装获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

// 封装渲染用户信息与头像函数
function renderAvatar(user) {
    // 渲染用户名
    var name = user.nickname || user.username
    $('.wellcome').html('欢迎&nbsp;&nbsp;' + name)

    // 渲染头像
    if (user.user_pic !== null) {
        // 显示图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        // 显示文字头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}