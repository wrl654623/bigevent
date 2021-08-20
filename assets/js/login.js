$(function() {
    // 点击去注册账号的链接
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show()

    });
    // 点击去登录的链接
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide()

    });
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        // 自定义 pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //验证两次密码是否一致
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次输入的密码不一样'
            }
        }
    });


    // 监听注册表单的提交时间
    $('#form_reg').on('submit', function(e) {
        // 阻止默认的提交行为
        e.preventDefault();
        // 发起post的ajax请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            $('#link-login').click()
        })
    });
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = 'index.html'
            }

        })
    })
})