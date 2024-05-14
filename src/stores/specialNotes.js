import { defineStore } from 'pinia';
import axios from 'axios';

export const useSpecialNotesStore = defineStore('specialNotes', {
    state: () => ({
        notes: [],
    }),
    getters: {

    },
    actions: {
        getNotes() {
            axios.get('http://138.68.111.238:1337/api/notes').then((response) => {
                this.notes = response.data.data;
            }).catch((error) => {
                console.error('Hata oluştu:', error);
            });
        },
        addNote(note) {
            this.notes.push(note);
            let data = {
                "data": {
                    text: note.text,
                    image: note.image,
                    timestamp: note.timestamp
                }
            };

            axios.post('http://138.68.111.238:1337/api/notes', data)
                .then(function (response) {
                    // Başarılı cevap durumunda burası çalışır
                    console.log('Sunucudan gelen cevap:', response);
                    if (response.status === 200) {
                        console.log('Not başarıyla eklendi.');
                    }
                })
                .catch(function (error) {
                    // Hata durumunda burası çalışır
                    console.error('Hata oluştu:', error);
                });
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
        },
    },
});
