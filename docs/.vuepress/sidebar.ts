import { sidebar } from 'vuepress-theme-hope'

// 配置导航栏
export default sidebar({
  '/': [
    '',
    {
      text: 'AI',
      icon: 'laptop-code',
      prefix: 'ai/',
      children: 'structure'
    },
    {
      text: '后端',
      icon: 'book',
      prefix: 'backend/',
      children: 'structure'
    },
    {
      text: '前端',
      icon: 'book',
      prefix: 'frontend/',
      children: 'structure'
    },
    {
      text: 'Transfomer',
      icon: 'a-061-robot',
      prefix: 'transformer/',
      children: 'structure'
    },
    {
      text: '数据库',
      icon: 'a-061-robot',
      prefix: 'db/',
      children: 'structure'
    }
  ]
})
