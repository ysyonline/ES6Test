/*
 //获取列表中的原有内容
 var content=document.getElementById("img").innerHTML;
 //每被调用一次，就将网页原有内容添加一份，这个大家可以写自己要加载的内容或指令
 function addLi(){
 document.getElementById("img").innerHTML+=content;
 }
 /!*
 * 监听滚动条，本来不想用jQuery但是发现js里面监听滚动条的事件不好添加，这边就引用了Jquery的$(obj).scroll();这个方法了
 *!/
 $(window).scroll(function(){
 //下面这句主要是获取网页的总高度，主要是考虑兼容性所以把Ie支持的documentElement也写了，这个方法至少支持IE8
 var htmlHeight=document.body.scrollHeight||document.documentElement.scrollHeight;
 //clientHeight是网页在浏览器中的可视高度，
 var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
 //scrollTop是浏览器滚动条的top位置，
 var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
 //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
 if(scrollTop+clientHeight==htmlHeight){
 addLi();
 }
 })*/
$("#img").append((function () {
	var str = "";
	for (var i = 0; i < 50; i++) {
		str += '<li>' + i + '</li>';
	}
	return str;
})());
var i = 0;
var addLi = function () {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (i >= 5) return resolve("");
			i++;
			var str = "";
			for (var l = 0; l < 50; l++) {
				str += '<li>' + (i * 50 + l) + '</li>';
			}
			return resolve(str);
		}, 3000);
	});


};
$(".loading").hide();
window.scrolling = false;
$(window).scroll(function () {
	if(window.scrolling){
		console.log("is loading data...");
		return;
	}
	var scrollHeight = document.body.scrollHeight;
	var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
	var scrollTop = document.body.scrollTop;

	console.log("scrollTop:", scrollTop, "clientHeight:", clientHeight, "scrollHeight:", scrollHeight, "window.height:", $(window).height(), "document.height:", $(document).height());


	if (scrollTop + clientHeight == scrollHeight) {
		window.scrolling = true;
		console.log("get data");
		$(".loading").show();
		$("#content").hide();
		addLi().then(function (e) {
			$(".loading").hide();

			$("#img").append(e);
			$("#content").show();
			window.scrolling = false;
		}).catch(function (e) {
			console.error(e.message);
		});



	}
});
function getjsTreeData() {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "https://www.jstree.com/fiddle/?lazy",
			dataType: "json",
			success:function (e) {
				return resolve(e);
			},
			error: function (e) {
				return reject(e);
			}
		});
	});
}
function getMulidata() {
	$("#content").hide();
	return getjsTreeData().then(function (e) {
		console.log("ddddddd");
		console.log(e);
		return Promise.resolve(e);
	});
}



