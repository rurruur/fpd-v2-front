// store/index.ts
import type { Commit } from 'vuex'
import { createStore } from 'vuex'
import http from './lib/http'

// 상태 타입 정의
interface State {
  isAuthenticated: boolean
  user: { username: string } | null
}

// 뮤테이션 타입 정의
enum MutationTypes {
  SET_AUTHENTICATION = 'SET_AUTHENTICATION',
  SET_USER = 'SET_USER'
}

// 뮤테이션 페이로드 타입 정의
interface SetAuthenticationPayload {
  isAuthenticated: boolean
}

interface SetUserPayload {
  user: { username: string } | null
}

export default createStore({
  state: {
    isAuthenticated: false,
    user: null
  } as State,
  mutations: {
    [MutationTypes.SET_AUTHENTICATION](state: State, payload: SetAuthenticationPayload) {
      state.isAuthenticated = payload.isAuthenticated
    },
    [MutationTypes.SET_USER](state: State, payload: SetUserPayload) {
      state.user = payload.user
    }
  },
  actions: {
    async checkAuthentication({ commit }: { commit: Commit }) {
      const res = await http.get('/auth')

      if (res.status !== 401) {
        commit(MutationTypes.SET_AUTHENTICATION, { isAuthenticated: true })
        commit(MutationTypes.SET_USER, { user: res.data })
      }
    },
    async login({ commit }: { commit: Commit }, user: { username: string }) {
      commit(MutationTypes.SET_AUTHENTICATION, { isAuthenticated: true })
      commit(MutationTypes.SET_USER, { user })
    },
    async logout({ commit }: { commit: Commit }) {
      commit(MutationTypes.SET_AUTHENTICATION, { isAuthenticated: false })
      commit(MutationTypes.SET_USER, { user: null })
    }
  },
  getters: {
    isAuthenticated: (state: State) => state.isAuthenticated,
    user: (state: State) => state.user
  }
})

// 뮤테이션, 액션, 게터를 사용하기 위한 타입 정의
export { MutationTypes }
export type { SetAuthenticationPayload, SetUserPayload, State }
