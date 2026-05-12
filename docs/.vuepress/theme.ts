import { getDirname, path } from 'vuepress/utils'
import { hopeTheme } from 'vuepress-theme-hope'

import navbar from './navbar.js'
import sidebar from './sidebar.js'

const __dirname = getDirname(import.meta.url)

export default hopeTheme({
  hostname: 'https://iFrrrank.github.io/',
  logo: '/logo.png',
  favicon: '/favicon.ico',
  author: {
    name: 'Frank',
    url: 'https://iFrrrank.github.io/'
  },
  darkmode: 'switch',
  repo: 'https://github.com/iFrrrank/iFrrrank.github.io',
  docsDir: 'docs',
  focus: false, // 阅读专注模式：点击文章自动隐藏导航栏，只看内容
  breadcrumb: false, // 页面顶部面包屑导航
  navbar, // 导航栏
  sidebar, // 侧边栏
  footer: "Frank's Blog", // 页脚文字
  displayFooter: true, // 显示页脚
  prevLink: true,
  nextLink: true,
  pageInfo: ['Author', 'Category', 'Tag', 'Original', 'Word', 'ReadingTime'],
  // 博客相关
  blog: {
    avatar: '/logo.png',
    name: 'Frank',
    description: 'AI与后端开发的探索者',
    medias: {
      Github: 'https://github.com/iFrrrank',
      Wechat: 'https://example.com'
    }
  },
  // 多语言配置
  metaLocales: {
    editLink: '在 GitHub 上编辑此页'
  },
  markdown: {
    align: true, // 文字居中/右对齐
    attrs: true, // 给元素加自定义属性
    codeTabs: true, // 代码块支持多标签切换
    mermaid: true, // 流程图、时序图、甘特图
    component: true, // 使用 Vue 组件
    demo: true, // 代码演示块
    figure: true, // 图片自动带标题
    gfm: true, // 支持 GitHub 风格 Markdown
    imgLazyload: true, // 图片懒加载
    imgSize: true, // 支持设置图片大小
    mark: true, // 文字高亮
    plantuml: true, // PlantUML 流程图
    spoiler: true, // 模糊隐藏内容
    sub: true, // 下标
    sup: true, // 上标
    tabs: true, // 选项卡
    tasklist: true, // 任务列表
    vPre: true, // 禁止 Vue 解析
    stylize: [
      {
        matcher: 'Recommended',
        replacer: ({ tag }) => {
          if (tag === 'em') {
            return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: 'Recommended'
            }
          }
        }
      }
    ],
    // 允许在 Markdown 中引入其他文件片段
    // include: true,
    include: {
      resolvePath: (file, cwd) => {
        if (file.startsWith('@')) {
          return path.resolve(__dirname, '../snippets', file.replace('@', './'))
        }
        return path.resolve(cwd, file)
      }
    },
    // 开启数学公式支持
    math: {
      type: 'mathjax'
    }
  },
  // 配置主题提供的插件
  plugins: {
    blog: true,
    sitemap: true, // 生成 SEO 站点地图
    components: {
      // 启用内置组件
      components: ['Badge', 'VPCard']
    },
    icon: {
      assets: '//at.alicdn.com/t/c/font_5176614_8qbor0nyav8.css'
    },
    // 复制自动加版权信息
    copyright: {
      author: 'Frank',
      license: 'MIT',
      triggerLength: 100, // 复制超过 100 字自动追加版权
      maxLength: 700, // 最大复制长度
      canonical: 'https://iFrrrank.github.io/', // 文章原始链接，默认为站点首页
      global: true
    },
    // 生成订阅源
    feed: {
      atom: true,
      json: true,
      rss: true
    }
  }
})

