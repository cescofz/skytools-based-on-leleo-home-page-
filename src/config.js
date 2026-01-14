const config = {
	//网页元数据
	metaData: {
		title: '柚子的工具箱',
		description: '欢迎来到柚子的工具箱！',
		keywords: '个人主页,个人网站',
		icon: '/favicon.ico'   //网页图标，支持外链
	},

	avatar: "/img/avatar.jpg", // 头像
	welcometitle: "Hi, I'm Sky.柚子", // 标题

	// 颜色配置
	color: {
		themecolor: "#FFFFFF", // 主题颜色，推荐趋于亮白可带有轻微色调，例： #D1FFEC
		welcometitlecolor: "#00FFFF", // 标题颜色 例： #7BFFC9
		turntablecolor1: "#FFFF00",  // 转盘渐变色一
		turntablecolor2: "#00FFFF"   // 转盘渐变色二
	},

	brightness: 70, // 背景亮度 --%
	blur: 2, // 毛玻璃模糊效果

	// 我的标签
	tags: ['乐观开朗', '温柔体贴', '随和亲切', '冷静沉着', '才思敏捷', '风趣幽默', '刚正不阿', '善解人意'],

	// 默认背景壁纸
	background: {
		"pc": {   //pc端
			"type": "pic",   //"pic":静态壁纸;"video":动态壁纸
			"datainfo": {
				"title": "",
				"preview": "/img/wallpaper/static/background-image.jpg",
				"url": "/img/wallpaper/static/background-image.jpg",     //当然，也可填写网络地址或壁纸api，如随机PC壁纸api："url":"https://t.mwm.moe/pc"
			},
		},
		"mobile": {   //移动端
			"type": "pic",
			"datainfo": {
				"title": "",
				"preview": "/img/wallpaper/static-mobile/background-mobile.png",
				"url": "/img/wallpaper/static-mobile/background-mobile.png"  //同理，随机移动端壁纸："url":"https://t.mwm.moe/mp"
			}
		}

	},

	//极坐标图数据
	polarChart: {
		skills: ["Python","C","C++","C#","Vue.js","SQL"],
		skillPoints: [90,80,70,70,50,50]
	},

	//社交按钮
	socialPlatformIcons: [
		{ icon: "mdi-github", link: "https://github.com/cescofz" },
		{ icon: "mdi-email", link: "mailto:lijiashu720720@126.com" },
		{ icon: "mdi-qqchat", link: "https://im.qq.com/" },
		{ icon: "mdi-wechat", link: "https://wx.qq.com/" },
		{ icon: "mdi-youtube", link: "https://www.youtube.com" },
		{ icon: "mdi-facebook", link: "https://www.facebook.com" }
	],

	//打字机
	typeWriterStrings: [
		"心简单，世界就简单，幸福才会生长；心自由，生活就自由，到哪都有快乐。",
		"生命太短，没有时间留给遗憾，若不是终点，请微笑一直向前。"
	],

	//音乐播放配置，采用MetingJS Api(https://github.com/metowolf/MetingJS)
	musicPlayer: {
		server: 'netease',  //服务提供商 --网易云音乐
		type: 'playlist',   //歌单类型
		id: '2028178887'  //歌单id ---> music.163.com/#/playlist?id=2028178887
	},

	//壁纸数据 -----可以将壁纸文件上传到图床获取网络直链。若想调用api，请前往脚本自行修改逻辑
	wallpaper: {
		pic: [

		],
		picMobile: [
		
				],
		video: [

		],
		videoMobile: [

		],
	},

	//项目卡片 其中 字段"show"控制初始卡片的text是否展开
	projectcards: [
		{ go: "🚀 前往", img: "https://api.t1qq.com/api/sky/sc/scrw?key=t7TB4UVUAfUFv31YLa9qYGBD9x", title: "光遇每日任务", text: "点击“前往”查看每日任务", show: true },
		{ go: "🗂️ 前往", img: "https://api.t1qq.com/api/sky/sc/scdl?key=t7TB4UVUAfUFv31YLa9qYGBD9x", title: "今日大蜡烛位置",  text: "点击“前往”查看今日大蜡烛位置", show: true },
		{ go: "🗂️ 前往", img: "https://api.t1qq.com/api/sky/sc/scrw?key=t7TB4UVUAfUFv31YLa9qYGBD9x", title: "光遇国服查询身高接口",  text: "使用前请创建好友码", show: true },	
		{ go: "📄 前往", img: "https://api.t1qq.com/api/sky/sc/scrw?key=t7TB4UVUAfUFv31YLa9qYGBD9x", title: "光遇红石日历", text: "点击“前往”查看当月红石日历", show: true },		
	],

}

export default config