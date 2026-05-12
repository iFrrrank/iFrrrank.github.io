import { sidebar } from 'vuepress-theme-hope'

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
    }
  ]
})

