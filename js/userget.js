function userget(){
    var token=getCookie("token")
    // 如果存在
    if(token !=0){
        // token解析
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let userData=JSON.parse(window.atob(base64));
        console.log(userData);
        nickname=userData.nickname
        avatar = userData.avatar
        // 获取头像信息
        var html = ''
        html+='<img src="'+avatar+'" alt="" class="profile">'
        $(".profile").html(avatar)
        // 更改用户名称
        $("#nickname").show()
        $("#login").hide()
        //插入用户昵称
        $("#nickname").html(nickname)
        // 更改头像信息
        $("#profile").html(html)
    }
}