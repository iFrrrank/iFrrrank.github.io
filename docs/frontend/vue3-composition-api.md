---
title: Vue 3 Composition API 实战
icon: vue
date: 2026-05-05
category:
  - 前端
tag:
  - Vue 3
  - TypeScript
  - Composition API
---

# Vue 3 Composition API 实战

## 前言

Vue 3 的 **Composition API** 是一种全新的组件逻辑组织方式，它解决了 Options API 在复杂组件中逻辑分散的问题，让代码更具 **可读性** 和 **可复用性**。

<!-- more -->

## 一、核心概念

### 1. setup 函数

`setup` 是 Composition API 的入口，在组件创建之前执行。

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
</script>

<template>
  <button @click="increment">
    Count: {{ count }} (Double: {{ doubleCount }})
  </button>
</template>
```

### 2. 响应式 API 对比

| API | 适用类型 | 访问方式 | 使用场景 |
|-----|----------|----------|----------|
| `ref` | 基本类型 / 对象 | `.value` | 单个响应式值 |
| `reactive` | 对象 | 直接访问 | 复杂对象 |
| `computed` | 计算属性 | `.value` | 派生状态 |
| `watch` | 侦听器 | 回调 | 副作用 |
| `watchEffect` | 自动侦听 | 回调 | 自动收集依赖 |

## 二、自定义 Hook（Composable）

Composition API 最大的优势是可以将逻辑提取为可复用的 **Composable 函数**：

```typescript
// useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = initialValue)

  return { count, doubleCount, increment, decrement, reset }
}
```

```vue
<script setup lang="ts">
import { useCounter } from './composables/useCounter'

const { count, doubleCount, increment, reset } = useCounter(10)
</script>
```

## 三、实战：封装 API 请求

```typescript
// useFetch.ts
import { ref, type Ref } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  execute: () => Promise<void>
}

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
```

## 总结

Composition API 让 Vue 3 的代码组织更加灵活，配合 TypeScript 可以获得更好的类型推导和开发体验。建议在新项目中优先使用 `<script setup>` 语法。
