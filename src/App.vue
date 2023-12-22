<template>
  <header>
    <v-breadcrumbs :items="items" divider="">
      <template v-slot:prepend>
        <span class="material-symbols-outlined" style="font-size: 2rem; margin-right: 1rem">
          emoji_people
        </span>
      </template>
    </v-breadcrumbs>
    <button v-if="isAuthenticated" @click="logout">로그아웃</button>
  </header>
  <main>
    <router-view> </router-view>
  </main>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import http from './lib/http'

export default {
  computed: {
    store() {
      return useStore()
    },
    isAuthenticated() {
      return this.store.getters.isAuthenticated
    },
    items() {
      const items = [
        { title: '홈', href: '/', disabled: false },
        { title: '글 목록', href: '/post', disabled: false }
      ]
      if (this.store.getters.user.role === 'ADMIN') {
        items.push({ title: '회원 관리', href: '/admin', disabled: false })
      }

      return this.store.getters.isAuthenticated
        ? items
        : [
            { title: '로그인', href: '/login', disabled: false },
            { title: '회원가입', href: '/register', disabled: false }
          ]
    }
  },

  methods: {
    async logout() {
      await http.post('/auth/logout')
      await this.store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
