$(function () {
    var form = layui.form;
    //去注册链接的效果
    $('.gologin').on('click', function () {
        $('.reglog').hide();
        $('.reglogin').show();
    });
    // 去登录链接的效果
    $('.goreglog').on('click', function () {
        $('.reglogin').hide();
        $('.reglog').show();
    });
    //注册页面的表单验证
    $('.laybtn').on('click', function () {
        form.verify({
            pass: [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
            samepwd: function (value) {
                var pwd = $('.pwd').val().trim();
                if (value !== pwd) {
                    return '两次密码不一致'
                }
            }
        })
    });
    //注册表单的提交行为
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    // 注册失败
                    return layer.msg(res.message)
                }
                // 如果没有被 return 出去，证明注册成功
                layer.msg('注册成功');
                $('.goreglog').click();
            }
        })
    })
    // 登录表单value值的初步验证
    $('.reglog').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        //发起请求
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);

                //判断是否成功
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功啦')
                //若成功，将res。token保存到本地
                localStorage.setItem('token', res.token);
                //然后跳转到index页面
                location.href = '/index.html'
            }
        })
    });


})