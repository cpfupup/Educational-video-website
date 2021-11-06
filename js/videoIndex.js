var token=localStorage.getItem("token");
$.ajaxSetup({
	headers: {
		"token": token
	}
})
// 获取一级标签
let tag1Arg = [];
var tagBox = $('#videoTag1');
let tag1 = [];
const page = 1;
$.ajax({
    url: path + '/admin/edu/subject/nested-list',
    type: 'get',
    success: function (response) {
        let tagId = [];
        tag1Arg = response.data.items;
        var html = template('taskTpl', {
            tasks: tag1Arg,
        });
        tagBox.html(html);
    }

})

// 获取二级标签
var tag2Ary = []
var tag2Box = $('#videoTag2')
$.ajax({
    url: path + '/admin/edu/subject/subject-list',
    type: 'get',
    success: function (reponse) {
        tag2Ary = reponse.data.items;
        var html = template("ary2Tpl", {
            tasks: tag2Ary
        })

        tag2Box.html(html);
    }

})

// 获取视频标签
var classVideo = [];
var page1 = [];
var videoCover = $("#videoClassVideo");
var videoPages = $("#videoPage");
$.ajax({
    url: path + '/admin/edu/course/list/' + page + '/40',
    type: "get",
    success: function (response) {
        classVideo = response.data.rows
        var pages = response.data.total / 40;
        var html = template("classVideoTpl", {
            tasks: classVideo

        })
        for (i = 0; i < pages; i++) {
            page1.push(i + 1);
        }
        var pageid = template("videoPageTpl", {
            pages: page1
        })
        videoCover.html(html);
        videoPages.html(pageid);
    }
})

// 1级标签按下触发效果
$(".videoTag1").on("click", "li", function () {
    checkCookie()
    $(this).css('background', 'rgb(62, 148, 245)').siblings("li").css('background', '')
    $(this).css('color', '#000').siblings("li").css('color', 'rgb(116, 114, 114)')
    $.ajax({
        url: path + '/admin/edu/course/list/' + page + '/40',
        type: 'get',
        data: {
            subjectParentId: $(this).attr('parentsid'),
        },
        success: function (reponse) {
            classVideo = reponse.data.rows
            var html = template("classVideoTpl", {
                tasks: classVideo
            })
            videoCover.html(html);
        }

    })
    // console.log($(this).attr('parentsid'))
    // console.log($(this).attr('tag1'))
});

//二级标题点击
$(".videoTag2").on("click", "li", function () {
    checkCookie()
    $(this).css('background', 'rgb(62, 148, 245)').siblings("li").css('background', '')
    $(this).css('color', '#000').siblings("li").css('color', 'rgb(116, 114, 114)')
    $.ajax({
        url: path + '/admin/edu/course/list/' + page + '/40',
        type: 'get',
        data: {
            subjectId: $(this).attr('id'),
        },
        success: function (reponse) {
            classVideo = reponse.data.rows
            var html = template("classVideoTpl", {
                tasks: classVideo
            })

            videoCover.html(html);
        }
    })

});
let id
let titler
$("#videoClassVideo").on("click", "li", function (e) {
    checkCookie(e)
    //观看视频
    id= $(this).attr("id")
    // 将id存储到本地存储中
    sessionStorage["id"]=id
    //储存视频名称
    titler= $(this).attr("value")
    sessionStorage["tit"]=titler
})

//视频选页选择
$(".videoPage").on("click", "li", function () {
    checkCookie(e)
    $(this).attr('href', '#')
    $(this).css('background', 'rgb(62, 148, 245)').siblings("li").css('background', '')
    $(this).css('color', '#000').siblings("li").css('color', 'rgb(116, 114, 114)')
    var page = $(this).attr("id")
    $.ajax({

        url: path + '/admin/edu/course/list/' + page + '/40',
        type: "get",
        success: function (response) {
            classVideo = response.data.rows
            // zheli
            var pages = response.data.total / 40;
            var html = template("classVideoTpl", {
                tasks: classVideo
            })
            videoCover.html(html);
        }
    });
});
// 学习路线
$(".classWay").click(function () {
    checkCookie()
    $(this).css('borderBottom', '2px solid orange').siblings('.allClass').css('borderBottom', '0px');
    $(".videoAll").hide()
    $(".videoWay").show()
    $(".classWay").css('color', 'white')
    $('.allClass').css('color', 'white')
    var classVideo = [];
    var page1 = [];
    var videoCover = $("#videoWayClassVideo");
    $.ajax({
        url: path + '/admin/edu/subject/subject-parent-list',
        type: 'get',
        data: {
            subjectParentId: $(this).attr('parentsid'),
        },
        success: function (reponse) {
            classVideo = reponse.data.items
            var html = template("videoWayClassVideoTpl", {
                tasks: classVideo
            })
            console.log(reponse.data.items)
            videoCover.html(html);
        }

    })
});
// 所有课程观看
$(".allClass").click(function () {
    checkCookie()
    $(this).css('borderBottom', '2px solid orange').siblings('.classWay').css('borderBottom', '0px')
    $(".videoAll").show()
    $(".videoWay").hide()
    $(".classWay").css('color', 'black')
    $('.allClass').css('color', 'black')
   
});


function checkCookie(e)
{
  var user=localStorage.getItem("token");
  console.log(user);
  if (user==null)
  {
    alert("请先进行登录");
    $(".signIn").show()
    e.preventDefault(true)
  }
  
 
}
function getCookie(cname)
{
  var name = cname + "=";
  var ca = localStorage.getItem("token").split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
$(".videoClassVideo").on("mouseover","li",function () {
    $(this).find(".mask").show()
    $(this).siblings().find(".mask").hide()
    
})

$(".videoClassVideo").on("mouseout","li",function () {
    $(this).find(".mask").hide()
    $(this).siblings().find(".mask").hide()
    
})

