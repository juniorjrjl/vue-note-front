import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

type AuthState = {
    accessToken: string | null
    accessTokenExpiresIn: number | null
}

type tokenPayload = {
    id: string
    email: string
}

const authKey = 'auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null as string | null,
        accessTokenExpiresIn: null as number | null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.accessToken && !!state.accessTokenExpiresIn && (state.accessTokenExpiresIn > Date.now()),
        accessTokenValue: (state) => state.accessToken,
        userId: (state) => {
            if (!state.accessToken) return null
            try {
                const decoded = jwtDecode<tokenPayload>(state.accessToken)
                return decoded.id
            } catch {
                return null
            }
        }
    },

    actions: {
        setAuth(auth: AuthState) {
            this.accessToken = auth.accessToken
            this.accessTokenExpiresIn = auth.accessTokenExpiresIn
            localStorage.setItem(authKey, JSON.stringify(auth))
        },
        loadAuth() {
            const auth = localStorage.getItem(authKey)
            if (auth) {
                const parsedAuth = JSON.parse(auth) as AuthState
                this.accessToken = parsedAuth.accessToken
                this.accessTokenExpiresIn = parsedAuth.accessTokenExpiresIn
            }
        },
        clearAuth() {
            this.accessToken = null
            this.accessTokenExpiresIn = null
            localStorage.removeItem(authKey)
        }
    }
})