import { navbar } from 'vuepress-theme-hope'

export default navbar([
  {
    text: '后端',
    icon: 'java',
    prefix: '/backend/',
    children: ['java-basics', 'spring-boot-guide']
  },
  {
    text: '前端',
    icon: 'react',
    prefix: '/frontend/',
    children: ['vue3-composition-api']
  },
  {
    text: 'AI',
    icon: 'a-061-robot',
    prefix: '/ai/',
    children: ['ai-agent-intro']
  }
])

