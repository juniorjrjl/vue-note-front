import { defineStore } from 'pinia'

const yesNoKey = 'yesNoPreference'

export enum YesNoResponse {
    YES = 'yes',
    NO = 'no',
    CANCEL = 'cancel'
}

export const useYesNoStore = defineStore('yesNo', {
    state: () => ({
        show: false,
        event: null as YesNoResponse | null,
        message: '' as string,
    }),

    getters: {
        hasPreference: (state) => state.event,
        title: (state) => state.message
    },
    actions: {
        open(message: string) {
            this.message = message
            this.show = true
            this.event = null
        },
        close(event: YesNoResponse) {
            this.event = event
            this.message = ''
            this.show = false
        }
    }
})