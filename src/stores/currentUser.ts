import { defineStore } from 'pinia'

const currentUserKey = 'currentUser'

export type CurrentUser = {
    id: string | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
}

export const useCurrentUserStore = defineStore('currentUser', {
    state: () => ({
        id: null as string | null,
        email: null as string | null,
        name: null as string | null,
        createdAt: null as Date | null,
        updatedAt: null as Date | null,
    }),

    getters: {
        currentUser: (state): CurrentUser => state
    },

    actions: {
        setCurrentUse(currentUser: CurrentUser) {
            const { id, name, email, createdAt, updatedAt } = currentUser
            this.id = id
            this.name = name
            this.email = email
            this.createdAt = createdAt
            this.updatedAt = updatedAt
        }
    }
})