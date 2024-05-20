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
            axios.get('https://usapi.badblli.dev/api/notes?populate=*').then((response) => {
                console.log('Sunucudan gelen cevap:', response.data.data);
                let note = response.data.data.map((note) => {

                    return {
                        text: note.text,
                        image: note.image.url ? 'https://usapi.badblli.dev' + note.image.url : null,
                        timestamp: note.timestamp
                    };

                });
                console.log(note);

                this.notes = note;
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

            axios.post('https://usapi.badblli.dev/api/notes', data)
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
