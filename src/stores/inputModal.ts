import { defineStore } from 'pinia'


export enum InputModalResponse {
    CONFIRM = 'confirm',
    CANCEL = 'cancel'
}

export const useInputModalStore = defineStore('inputModal', {
    state: () => ({
        show: false,
        event: null as InputModalResponse | null,
        message: '' as string,
        value: '' as string
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
            this.value = ''
        },
        close(event: InputModalResponse) {
            this.event = event
            this.message = ''
            this.show = false
        },
        setValue(value: string) {
            this.value = value
        }
    }
})