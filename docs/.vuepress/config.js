module.exports = {
    base: '/blog/',
    title: '我的个人博客',
    dest: './production',
    markdown: {
      lineNumbers: true
    },
    /*配置文件*/
    themeConfig: {
      /*横向导航*/
      nav: require('../guide/nav'), // 1.先配置横向导航
      sidebar: require('../guide/sidebar'),//2.
      sidebarDepth: 2,
      lastUpdated: 'Last Updated',
      searchMaxSuggestions: 10,
      serviceWorker: {
        updatePopup: {
          message: "有新的内容.",
          buttonText: '更新'
        }
      }
    }
  };