<template>
  <h2 style="margin-bottom: 20px">로그인</h2>
  <v-form @submit.prevent="login">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      class="mb-2"
      clearable
      label="이메일"
      type="email"
      variant="outlined"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      clearable
      label="비밀번호"
      placeholder="Enter your password"
      type="password"
      variant="outlined"
    ></v-text-field>

    <br />

    <v-btn :disabled="onSubmit" block color="primary" size="large" type="submit" variant="outlined">
      Sign In
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import http from '../../lib/http'

export default {
  name: 'LoginView',

  setup() {
    const email = ref('')
    const password = ref('')
    const onSubmit = ref(false)
    const store = useStore()
    const router = useRouter()

    const emailRules = [
      (v: string) => !!v || '이메일을 입력해주세요.',
      (v: string) => /.+@.+\..+/.test(v) || '이메일이 유효하지 않습니다.'
    ]

    const passwordRules = [
      (v: string) => !!v || '비밀번호를 입력해주세요.',
      (v: string) => (v && v.length >= 8) || '비밀번호는 8자 이상이어야 합니다.'
    ]

    async function login() {
      const res = await http.post('/auth/login', {
        email: email.value,
        password: password.value
      })

      if (res.status === 200) {
        store.dispatch('login', { name: res.data.name })
        return router.push('/')
      }

      alert('로그인에 실패했습니다.')
    }

    return {
      email,
      password,
      onSubmit,
      emailRules,
      passwordRules,
      login
    }
  }
}
</script>
