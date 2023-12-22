<template>
  <h2 style="margin-bottom: 20px">글 작성</h2>
  <v-form @submit.prevent="submit">
    <v-textarea
      v-model="form.title"
      auto-grow
      variant="outlined"
      label="제목"
      rows="1"
    ></v-textarea>
    <v-textarea
      v-model="form.content"
      auto-grow
      variant="outlined"
      label="내용"
      rows="5"
    ></v-textarea>
    <v-btn type="submit" block color="primary" :disabled="isSubmitDisabled">작성</v-btn>
  </v-form>
</template>

<script lang="ts">
import http from '../../lib/http'

export default {
  name: 'PostView',

  data: () => ({
    form: {
      title: '',
      content: ''
    }
  }),

  computed: {
    isSubmitDisabled() {
      return this.form.title === '' || this.form.content === ''
    }
  },

  methods: {
    async submit() {
      const res = await http.post('/post', this.form)

      if (res.status === 201) {
        return this.$router.push(`/post/${res.data.id}`)
      }

      alert('게시글 작성 중 오류가 발생했습니다.')
    }
  }
}
</script>
