$(function () {
    // 1. 定义校验规则
    var form = layui.form
    form.verify({
        nickname : function (value) {
            if (value.length > 6) {
                return '用户名称长度为 1 ~ 6 个字符之间'
            }
        }
    })

    // 2. 获取用户信息,渲染到页面
    var layer = layui.layer
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3. 点击重置按钮,将表单数据重置为原本数据,渲染到页面
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 4. 提交修改的用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改用户信息成功!')
                window.parent.getUserInfo()
            }
        })
    })
})