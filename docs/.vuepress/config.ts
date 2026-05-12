import { defineUserConfig } from 'vuepress'

import theme from './theme.js'
import viteBundler from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: "Frank's Blog",
  description: 'Frank 的个人技术博客，分享前后端开发、AI Agent、面试经验等内容',
  head: [
    //  SEO + 社交平台优化 + 移动端适配
    ['meta', { name: 'robots', content: 'all' }], // 允许搜索引擎抓取、索引整个网站
    ['meta', { name: 'author', content: 'Frank' }], // 标注作者
    ['meta', { property: 'og:site_name', content: "Frank's Blog" }], // Facebook / 微信 / 社交平台分享时显示的网站名
    ['meta', { property: 'og:type', content: 'website' }], // 告诉社交平台这是一个网站
    ['meta', { property: 'og:locale', content: 'zh_CN' }], // 区域语言：zh_CN
    ['meta', { property: 'og:url', content: 'https://iFrrrank.github.io/' }], // 网站正式地址
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }], // iPhone 添加到桌面时可全屏打开
    // 添加百度统计 - 异步加载避免阻塞渲染
    [
      'script',
      { defer: true },
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743";
          hm.async = true;
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`
    ]
  ],
  // 配置打包工具 Vite
  bundler: viteBundler({
    viteOptions: {
      css: {
        // 关闭 SCSS 废弃警告
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ['if-function']
          }
        }
      }
    }
  }),
  theme,
  // 页面匹配规则：匹配所有 md 文件，排除代码片段文件，排除配置文件夹，排除依赖包
  pagePatterns: ['**/*.md', '!**/*.snippet.md', '!.vuepress', '!node_modules'],
  shouldPrefetch: false, // 关闭预加载（提前加载未来可能访问的页面），提升性能
  shouldPreload: false // 关闭预加载（提前加载关键资源），提升性能
})

