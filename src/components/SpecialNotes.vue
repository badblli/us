<template>
  <div class="special-notes">
    <h2>Special Notes</h2>
    <div class="area">
      <textarea v-model="note" placeholder="Type your note here..."></textarea>
      <!-- Dosya seçme alanı gizli -->
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
      />
      <!-- Icon buton -->
      <p @click="openFileInput">
        <i class="fas fa-file"></i
        ><span v-if="!selectedFileName">Dosya Ekle</span>
      </p>
      <!-- Dosya adını göster -->
      <div v-if="selectedFileName">Dosya Seçildi</div>
      <button @click="saveNote">
        {{ editingIndex === null ? "Kaydet" : "Güncelle" }}
      </button>
    </div>

    <div class="note-list">
      <div v-for="(note, index) in reversedNotes" :key="index" class="note">
        <div class="note-area">
          <p>{{ note.text }}</p>
          <img
            class="img"
            :src="note.image"
            v-if="note.image"
            alt="Note Image"
          />
        </div>
        <small class="timestamp">{{ note.timestamp }}</small>
        <!-- <button @click="editNote(index)">Edit</button>
        <button @click="deleteNote(index)">Delete</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useSpecialNotesStore } from "@/stores/specialNotes";

export default defineComponent({
  name: "SpecialNotes",
  data() {
    return {
      note: "",
      editingIndex: null,
      selectedFile: null, // Seçilen dosyayı tutmak için
      selectedFileName: "", // Seçilen dosya adını tutmak için
    };
  },
  computed: {
    notes() {
      return useSpecialNotesStore().notes;
    },
    reversedNotes() {
      return this.notes.slice().reverse(); // Notları ters sırayla döndür
    },
  },
  methods: {
    saveNote() {
      if (this.note.trim() === "" && !this.selectedFile) return;
      if (this.editingIndex === null) {
        useSpecialNotesStore().addNote({
          text: this.note,
          timestamp: new Date().toLocaleString(),
          image: this.selectedFile
            ? URL.createObjectURL(this.selectedFile)
            : null, // Dosya varsa URL'yi kaydet
        });
      } else {
        useSpecialNotesStore().updateNote(this.editingIndex, {
          text: this.note,
          timestamp: new Date().toLocaleString(),
          image: this.selectedFile
            ? URL.createObjectURL(this.selectedFile)
            : null, // Dosya varsa URL'yi kaydet
        });
        this.editingIndex = null;
      }
      this.note = "";
      this.selectedFile = null; // Seçilen dosyayı temizle
      this.selectedFileName = ""; // Dosya adını temizle
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = event.target.files[0].name; // Dosya adını sakla
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    editNote(index) {
      this.note = this.notes[index].text;
      this.editingIndex = index;
    },
    deleteNote(index) {
      useSpecialNotesStore().deleteNote(index);
    },
  },
});
</script>
<style scoped>
.special-notes {
  margin: 20px;
}
.timestamp {
  display: flex;
  justify-content: flex-end;

  font-size: 0.8em;
  color: #666;
}

.area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.note-area {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}

.img {
  width: 200px; /* Set the width */
  height: 200px; /* Set the height to create a square */
  object-fit: cover; /* Ensure the image covers the entire container */
  overflow: hidden; /* Hide any overflow beyond the container */
}

textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-family: "Work Sans", sans-serif;
}

.note-list {
  margin-top: 10px;
}

.note {
  /* border: 1px solid #ccc; */
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

button {
  cursor: pointer;
  padding: 10px;
  font-size: 1.2em;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  background-color: #4400ff;
  outline: none;
  border: none;
  color: #fff;
  box-shadow: 0px 5px 0px 0px rgb(21, 0, 70);
  transform: translateY(-5px);
  -webkit-transform: translateY(-5px);
  -moz-transform: translateY(-5px);
  -ms-transform: translateY(-5px);
  -o-transform: translateY(-5px);
  transition: background-color 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease;
  -webkit-transition: background-color 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease;
  -moz-transition: background-color 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease;
  -ms-transition: background-color 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease;
  -o-transition: background-color 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease;
  @media screen and (min-width: 768px) {
    max-width: 1060px;
  }
  &:hover {
    background-color: #5900ff;
    box-shadow: 0px 9px 0px 0px #130046;
    transform: translateY(-8px);
    -webkit-transform: translateY(-8px);
    -moz-transform: translateY(-8px);
    -ms-transform: translateY(-8px);
    -o-transform: translateY(-8px);
  }
  &:active {
    background-color: #5900ff;
    box-shadow: 0px 0px 0px 0px #130046;
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
  }
}
</style>
