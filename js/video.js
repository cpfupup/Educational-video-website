var token=localStorage.getItem("token");
$.ajaxSetup({
	headers: {
		"token": token
	}
})
var path = 'http://wangmingyu.shop:9110'
//调出id
var id = sessionStorage["id"]
// 调出视频名字
var videoName = sessionStorage["tit"]
// 插入视频名称
$(".tit").html(videoName)

//观看视频"
//保存章节数组
var videoUnit = []
var unitChoice = $('#choice')
//获取视频选择
var videoClass = []
var videoClassChoice = $("#unit")
$.ajax({
    type: 'get',
    url: path + '/admin/edu/chapter/nested-list/' + id,
    success: function (reponse) {
        //获取课程章节
        videoUnit = reponse.data.items
        // console.log(videoUnit);
        // 做出html
        var html = ''
        for (i = 0; i < videoUnit.length; i++) {
            videoClass[i] = videoUnit[i].children
            var b = i + 1
            html += '<div class="unit"><span class="uni">章节</span><span class="unit_number">' + b + '</span><span class="unit_name">' + videoUnit[i].title + '</span></div>'
            for (a = 0; a < videoClass[i].length; a++) {
                var c = a + 1
                html += '<div href="./video.html" id="classes" show="'+videoClass[i][a].videoSourceId+'"><div class ="unitClass"><span class="Cla">课时</span><span class="Class_number">' + c + '</span><span class="Class_name">' + videoClass[i][a].title + '</span></div></div>'
            }
        }
        unitChoice.html(html)
    }
})
$("#choice").on("click","#classes",function(){
  checkCookie()
    var videoShow = $(this).attr("show")
    $(this).css('background', 'rgb(95, 87, 102)').siblings("#classes").css('background', '')
    player.start(videoShow) 
})

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