<script setup lang="ts">
import { formatDate } from '../lib/date'

defineProps<{
  post: {
    id: number
    title: string
    createdAt: string
  }
}>()

defineExpose({ formatDate })
</script>

<template>
  <router-link div class="list-item" :to="{ path: `post/${post.id}` }">
    <h4 class="list-item-title">{{ post.title }}</h4>
    <p class="item-date">{{ formatDate(post.createdAt) }}</p>
  </router-link>
</template>

<script lang="ts">
export default {
  name: 'PostListItem'
}
</script>

<style scoped>
.list-item {
  padding: 10px;
  margin-bottom: 10px;
}
.list-item-title {
  font-size: 17px;
}
</style>
