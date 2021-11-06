
let player = new Player({
    "id": "mse",
    "playsinline": true,
    lastPlayTime: 5, //视频起播时间（单位：秒）
    lastPlayTimeHideDelay: 5, //提示文字展示时长（单位：秒）
    "whitelist": [
        ""
    ],
    "width": null,
    "height": null,
    "autoplay": true,
    "keyShortcut": "on",
    "url": '',
    "playbackRate": [
        null
    ],
    "pip": true,
    "thumbnail": {
        "pic_num": 44,
        "width": 160,
        "height": 90,
        "col": 10,
        "row": 10,
        "urls": [
            ""
        ]
    },
    "progressDot": [
        {
            "time": 3,
            "text": "text1"
        },
        {
            "time": 5,
            "text": "text2"
        },
        {
            "time": 32,
            "text": "text3"
        },
        {
            "time": 36,
            "text": "text4"
        }
    ],
    "danmu": {
        "comments": [
            {
                "duration": 15000,
                "id": "2",
                "start": 3000,
                "txt": "长弹幕长弹幕长弹幕",
                "mode": "top"
            },
            {
                "duration": 15000,
                "id": "3",
                "start": 4000,
                "txt": "长弹幕长弹幕长弹幕",
                "mode": "bottom"
            },
            {
                "duration": 15000,
                "id": "4",
                "start": 5000,
                "txt": "长弹幕长弹幕长弹幕",
                "mode": "scroll"
            },
            {
                "duration": 15000,
                "id": "5",
                "start": 8000,
                "txt": "长弹幕长弹幕长弹幕",
                "mode": "scroll"
            }
        ],
        "area": {
            "start": 0,
            "end": 1
        },
        "closeDefaultBtn": false,
        "defaultOff": false,
        "panel": true
    }
});
player.emit('resourceReady', [])
