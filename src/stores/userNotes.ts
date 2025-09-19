import { defineStore } from 'pinia'


type NoteItem = {
    id: string;
    title: string;
    body: string
}

type NoteToPersist = {
    id: string;
    title: string;
    body: string
}

export const useUserNotesStore = defineStore('userNotes', {
    state: () => ({
        notes: [] as NoteItem[],
        query: null as string | null,
        noteToPersist: null as NoteToPersist | null,
        selectedNote: null as NoteItem | null
    }),

    actions: {
        setNotes(notes: NoteItem[]) {
            this.notes = notes
        },
        setQuery(query: string) {
            this.query = query
        },
        setNoteToPersist(noteToPersist: NoteToPersist) {
            this.noteToPersist = noteToPersist
        },
        updateNote(note: NoteItem) {
            this.notes = this.notes.map(n =>
                n.id === note.id ? note : n
            )
        },
        addNote(note: NoteItem) {
            this.notes = [...this.notes, note]
        },
        setSelectedNote(selectedNote: NoteItem) {
            this.selectedNote = selectedNote
        }
    }
})