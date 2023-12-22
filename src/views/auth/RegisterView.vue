<template>
  <h2 style="margin-bottom: 20px">회원가입</h2>
  <v-form @submit.prevent="register">
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

    <v-text-field
      v-model="name"
      :rules="nameRules"
      clearable
      label="별명"
      placeholder="별명을 입력하세요."
      type="text"
      variant="outlined"
    ></v-text-field>

    <br />

    <v-btn :disabled="onSubmit" block color="primary" size="large" type="submit" variant="outlined">
      Sign Up
    </v-btn>
  </v-form>
  <!-- <template v-if="isActive">
    <v-card title="Dialog">
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
      </v-card-actions>
    </v-card>
  </template> -->
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '../../lib/http'

export default {
  name: 'RegisterView',

  setup() {
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const onSubmit = ref(false)
    const router = useRouter()
    const isActive = ref(false)

    const emailRules = [
      (v: string) => !!v || '이메일을 입력해주세요.',
      (v: string) => /.+@.+\..+/.test(v) || '이메일이 유효하지 않습니다.'
    ]

    const passwordRules = [
      (v: string) => !!v || '비밀번호를 입력해주세요.',
      (v: string) => (v && v.length >= 8) || '비밀번호는 8자 이상이어야 합니다.'
    ]

    const nameRules = [
      (v: string) => !!v || '별명을 입력해주세요.',
      (v: string) => (v && v.length >= 1) || '별명은 1자 이상이어야 합니다.',
      (v: string) => (v && v.length <= 30) || '별명은 30자 이하여야 합니다.'
    ]

    async function register() {
      const res: { status: number; message: string } = await http.post('/auth/register', {
        email: email.value,
        password: password.value,
        name: name.value
      })

      if (res.status === 201) {
        isActive.value = true
        return router.push('/login')
      }

      alert(res.message ?? '로그인에 실패했습니다.')
    }

    return {
      email,
      password,
      name,
      onSubmit,
      emailRules,
      passwordRules,
      nameRules,
      register,
      isActive
    }
  }
}
</script>
