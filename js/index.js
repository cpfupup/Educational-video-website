var path = 'http://wangmingyu.shop:9110'
// 自动检测是否有用户信息
var token = localStorage.getItem("token");
// console.log(token)
// 如果存在
if (token != null) {
    console.log(token);
    // token解析
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let userData = JSON.parse(window.atob(base64));
    getCookie()
    nickname = userData.nickname
    avatar = userData.avatar
    // 获取头像信息
    var html = ''
    html += '<img src="' + avatar + '" alt="" class="profile">'
    $(".profile").html(avatar)
    // 更改用户名称
    $("#nickname").show()
    $("#login").hide()
    //插入用户昵称
    $("#nickname").html(nickname)
    // 更改头像信息
    $("#profile").html(html)
}


// 导航栏标签
$(".my_study").hover(function () {
    $(".my_study_box").stop().toggle();
})
$(".profile_mes").hover(function () {
    $(".profile_mes_box").stop().toggle();
})
$(".search").focus(function () {
    $(".history_search").stop().toggle();
})
$(".search").blur(function () {
    $(".history_search").stop().toggle();
})
$(".login").click(function () {
    $(".signIn").show();
})
// 账号密码登录
$(".phone").click(function () {
    $(".verifiShowBox").hide().siblings(".phoneShowBox").show().siblings(".logonShowBox").hide().siblings(".resetKeyBox").hide();


})
$(".sign-in").click(function () {
    $(".phoneShowBox").show().siblings(".logonShowBox").hide().siblings(".resetKeyBox").hide();
    $(".phone").show();
    $(".verifi").show();
})


$(".start").click(function () {
    let long = $(".studyBox").offset().top;
    $("body,html").stop().animate({
        scrollTop: long
    });

})
$(".signOut").click(function () {
    $(".signIn").hide()
})
//进行登录
var token;
var paths = 'http://wangmingyu.shop:9110'
$("#phoneIn").click(function () {
    $.ajax({
        url: paths + '/login/user/login',
        type: 'post',
        contentType: 'application/json',
        async:false,
        data: JSON.stringify({
            username: $(".phoneNumber").val(),
            password: $(".phoneKey").val()
        }),
        success: function (reponse) {
            var nickname;
            var log = reponse.success
            //存储token
            token = reponse.data.token
            if (token != undefined) {
                localStorage.setItem("token", token)
            }
            //判断是否登录成功
            if (log == false) {
                alert("请检查用户名密码")
            } else if (log == true) {
                $(".signIn").hide()
                // 解析token
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                let userData = JSON.parse(window.atob(base64));
                nickname = userData.nickname
                avatar = userData.avatar
                // 更改用户名称
                $("#nickname").show()
                $("#login").hide()
                $("#nickname").html(nickname)
                $(".profile").html(avatar)
                //更换用户头像
                var html = ''
                html += '<img src="' + avatar + '" alt="" class="profile">'
                $("#profile").html(html)
    
            }
            location.reload()
        }
        
    })
    
})
// text
var token = localStorage.getItem("token");
$.ajaxSetup({
    headers: {
        "token": token
    }
})
// 视频

var classVideo = [];
var page1 = [];
var videoCover = $("#classVideo");
$.ajax({
    url: path + '/admin/edu/course/list/1/40',
    type: 'get',
    data: {
        subjectParentId: $(this).attr('parentsid'),
    },
    success: function (response) {
        classVideo = response.data.rows
        // console.log(classVideo);
        var html = template("classVideoTpl", {
            tasks: classVideo
        })
        videoCover.html(html);
    }

})


//点击观看面罩
$(".classVideo").on("mouseover", "li", function () {
    $(this).find(".mask").show()
    $(this).siblings().find(".mask").hide()

})

$(".classVideo").on("mouseout", "li", function () {
    $(this).find(".mask").hide()
    $(this).siblings().find(".mask").hide()

})
$(".classVideo").on("click", "li", function () {


})
//阻止默认跳转
$(".classVideo").on("click", "li", function (e) {
    checkCookie(e)
    id = $(this).attr("id")
    // 将id存储到本地存储中
    sessionStorage["id"] = id
    //储存视频名称
    titler = $(this).attr("value")
    sessionStorage["tit"] = titler

})

$(".allNav").on("click", "a", function (e) {
    checkCookie(e)

})
$(".profile_mes_box").on("click", "li", function (e) {
    checkCookie(e)
})

// 退出登录
$(".signOut").click(function () {
    localStorage.removeItem("token");
    // 更改用户名称
    $("#nickname").hide()
    $("#login").show()
    $("#nickname").html(nickname)
    $(".profile").html(avatar)
    //更换用户头像
    var html = ''
    html += '<img src="./img/头像.png" alt="" class="profile">'
    $("#profile").html(html)
})

function checkCookie(e) {
    var user = localStorage.getItem("token");
    console.log(user);
    if (user == null) {
        alert("请先进行登录");
        $(".signIn").show()
        e.preventDefault(true)
    }


}
function getCookie(cname) {
    var name = cname + "=";
    var ca = localStorage.getItem("token").split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}