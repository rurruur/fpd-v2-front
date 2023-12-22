<script setup lang="ts">
import { formatDate } from '../../lib/date'

defineExpose({ formatDate })
</script>

<template>
  <div class="post-detail">
    <h2 class="item-title">{{ post.title }}</h2>
    <div class="item-info">
      <span class="item-name">작성자: {{ post.name }}</span>
      <span class="item-date">작성일: {{ formatDate(post.createdAt) }}</span>
    </div>
    <p class="item-content">{{ post.content }}</p>
    <div class="comment">
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="comment"
              :append-icon="loading ? 'mdi-loading' : 'mdi-send'"
              :rules="commentRules"
              variant="underlined"
              clear-icon="mdi-close-circle"
              clearable
              label="댓글"
              type="text"
              @click:append="addComment"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <div class="comment-list">
        <div class="comment-item" v-for="comment in post.comments" :key="comment.id">
          <div class="comment-info">
            <span class="comment-name">{{ comment.name }}</span>
            <span class="comment-date item-date">{{ formatDate(comment.createdAt) }}</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import http from '../../lib/http'

export default {
  name: 'PostDetailView',

  data: () => ({
    post: {
      id: 0,
      title: '',
      content: '',
      createdAt: '',
      name: '',
      uid: '',
      comments: [] as {
        id: number
        content: string
        createdAt: string
        name: string
        uid: string
      }[]
    },
    comment: '',
    loading: false,
    commentRules: [(v: string) => !!v || '댓글을 입력해주세요.']
  }),

  mounted() {
    this.load(this.$route.params.id as string)
  },

  methods: {
    async load(id: string) {
      const res = await http.get(`/post/${id}`)

      if (res.status !== 200) {
        return alert('error')
      }
      this.post = res.data
    },
    async addComment() {
      if (this.comment === '') {
        return
      }

      await http.post(`/post/${this.post.id}/comment`, {
        comment: this.comment
      })

      this.load(this.$route.params.id as string)
    }
  },

  watch: {
    $route(to) {
      this.load(to.params.id)
    }
  }
}
</script>

<style scoped>
.post-detail {
  padding: 10px;
  margin-bottom: 10px;

  .item-title {
    font-size: 1.5rem;
  }

  .item-info {
    display: flex;
    justify-content: space-between;
    padding-bottom: 2rem;
  }

  .item-content {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .comment-item {
    padding: 1rem 0 1rem 0;
  }

  .comment-info {
    display: flex;
    justify-content: space-between;
  }
}
</style>
