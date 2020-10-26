$(function () {
    // 1. 点击跳转链接,切换显示隐藏登录模块与注册模块
    $('#link-reg').on('click', function () {
        $('.login-box').hide().siblings('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show().siblings('.reg-box').hide()
    })

    // 2. 自定义表单规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return "对不起,两次密码不一致,请重新输入!"
            }
        }
    })


    // 统一配置 Ajax 选项
    $.ajaxPrefilter(function (options) {
        // 更改url
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
    // 3. 提交注册表单,发起Ajax请求
    $('#form-reg').on('submit', function (e) {
        // 阻止表单提交默认事件
        e.preventDefault()
        // 发起Ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg input[name=username]').val(),
                password : $('#form-reg input[name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
            }
        })
    })
})
