import { defineStore } from 'pinia';

export const useSpecialNotesStore = defineStore('specialNotes', {
    state: () => ({
        notes: [],
    }),
    actions: {
        addNote(note) {
            this.notes.push(note);
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
        },
    },
});
