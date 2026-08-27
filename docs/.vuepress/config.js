module.exports = {
    base: '/',
    title: '胡鹏飞的博客',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/logo3.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    dest: 'docs/.vuepress/dist',
    markdown: {
        lineNumbers: true
    },
    /*配置文件*/
    themeConfig: {
        /*横向导航*/
        logo: '/logo3.png',  // 左上角logo
        nav: require('../guide/nav'), // 1.先配置横向导航
        // sidebar: require('../guide/sidebar'),//2.
        sidebar: 'auto',
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        search: true,
        searchMaxSuggestions: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        }
    },
    plugins: [
        [
            'vuepress-plugin-helper-live2d', {
                // 是否开启控制台日志打印(default: false)
                log: false,
                live2d: {
                    // 是否启用(关闭请设置为false)(default: true)
                    enable: true,
                    // 模型名称(default: hibiki)>>>取值请参考：
                    // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
                    model: 'hibiki',
                    display: {
                        position: "right", // 显示位置：left/right(default: 'right')
                        width: 135, // 模型的长度(default: 135)
                        height: 300, // 模型的高度(default: 300)
                        hOffset: 65, //  水平偏移(default: 65)
                        vOffset: 0, //  垂直偏移(default: 0)
                    },
                    mobile: {
                        show: false // 是否在移动设备上显示(default: false)
                    },
                    react: {
                        opacity: 0.8 // 模型透明度(default: 0.8)
                    }
                }
            }
        ]
    ]
};