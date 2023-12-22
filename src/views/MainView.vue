<template>
  <h2 style="margin-bottom: 20px">글 목록</h2>
  <v-infinite-scroll :items="posts" @load="load" mode="manual">
    <template v-for="post in posts" :key="post.id">
      <post-list-item :post="post" />
    </template>
    <template v-slot:error="{ props }">
      <v-alert type="error">
        <div class="d-flex justify-space-between align-center">
          오류가 발생했습니다.
          <v-btn color="white" variant="outlined" size="small" v-bind="props"> Retry </v-btn>
        </div>
      </v-alert>
    </template>
  </v-infinite-scroll>
</template>

<script lang="ts">
import PostListItem from '../components/PostListItem.vue'
import http from '../lib/http'

export default {
  name: 'MainView',
  components: { PostListItem },

  data: () => ({
    posts: [] as {
      id: number
      title: string
      content: string
      createdAt: string
      name: string
      uid: string
    }[],
    pagination: { page: 1, limit: 10 }
  }),

  created() {
    this.load({ done: () => {} })
  },

  methods: {
    async load({ done }: { done: any }) {
      const res = await http.get('/post', { params: this.pagination })

      if (res.status !== 200) {
        return done('error')
      }
      this.posts.push(...res.data)
      this.pagination.page += 1
      if (res.data.length < this.pagination.limit) {
        return done('empty')
      }
      done('ok')
    }
  }
}
</script>
