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
        accept="image/*"
      />
      <!-- Icon buton -->
      <!-- <p @click="openFileInput">
        <i class="fa-solid fa-paperclip"></i
        ><span v-if="!selectedFileName">Dosya Ekle</span>
      </p> -->
      <!-- Dosya adını göster -->
      <div v-if="selectedFileName">Dosya Seçildi</div>
      <button @click="saveNote">
        {{ editingIndex === null ? "Kaydet" : "Güncelle" }}
      </button>
    </div>
    <!-- Tarih filtreleme arayüzü -->
    <div class="date-filters">
      <button
        v-for="date in reversedDates"
        :key="date"
        @click="selectedDate = date"
        :class="{ active: selectedDate === date }"
      >
        {{ date }}
      </button>
      <button
        @click="selectedDate = null"
        :class="{ active: selectedDate === null }"
      >
        Tümü
      </button>
    </div>
    <!-- Notlar listesi -->
    <div v-for="(group, date) in groupedNotes" :key="date">
      <h3>{{ date }}</h3>
      <div v-for="(note, index) in group" :key="index" class="note">
        <div v-if="note.image != null" class="img-container">
          <img class="img" :src="note.image" alt="Note Image" />
        </div>
        <p
          v-if="
            !isSpotifyTrackLink(note.text) && !isSpotifyPlaylistLink(note.text)
          "
        >
          {{ note.text }}
        </p>
        <iframe
          v-else
          :src="convertToSpotifyEmbed(note.text)"
          width="300"
          height="80"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>

        <small>{{ note.timestamp }}</small>
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
      selectedDate: null,
      note: "",
      editingIndex: null,
      selectedFile: null, // Seçilen dosyayı tutmak için
      selectedFileName: "", // Seçilen dosya adını tutmak için
    };
  },
  computed: {
    active() {
      return Object.keys(grouped)[Object.keys(grouped).length - 1];
    },
    notes() {
      return useSpecialNotesStore().notes;
    },
    reversedDates() {
      return this.dates.slice().reverse();
    },
    dates() {
      // Notların tarihlerini alma ve tekrar etmeyenleri filtreleme
      const uniqueDates = new Set(
        this.notes.map((note) => note.timestamp.split(" ")[0])
      );
      return Array.from(uniqueDates);
    },
    groupedNotes() {
      // Seçilen tarihe göre notları gruplama
      const grouped = {};
      const filteredNotes = this.notes.filter((note) => {
        return (
          !this.selectedDate ||
          note.timestamp.split(" ")[0] === this.selectedDate
        );
      });
      filteredNotes.forEach((note) => {
        const date = note.timestamp.split(" ")[0];
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(note);
      });
      return grouped;
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
    isSpotifyTrackLink(text) {
      // Spotify track linkini kontrol etmek için regex kullanma
      return /https:\/\/open\.spotify\.com\/intl-tr\/track\/\w+/i.test(text);
    },

    isSpotifyPlaylistLink(text) {
      // Spotify playlist linkini kontrol etmek için regex kullanma
      return /https:\/\/open\.spotify\.com\/playlist\/\w+/i.test(text);
    },

    convertToSpotifyEmbed(link) {
      // Spotify linkini gömülü çalar linkine dönüştürme
      if (this.isSpotifyTrackLink(link)) {
        // Track linki ise, uygun embed formatında oluştur
        return (
          link.replace(
            "https://open.spotify.com/intl-tr/track/",
            "https://open.spotify.com/embed/track/"
          ) + "?utm_source=generator"
        );
      } else if (this.isSpotifyPlaylistLink(link)) {
        // Playlist linki ise, uygun embed formatında oluştur
        return link.replace(
          "https://open.spotify.com/",
          "https://open.spotify.com/embed/"
        );
      } else {
        return link; // Spotify linki değilse doğrudan linki döndür
      }
    },
  },
  watch: {},
  mounted() {
    // Notlar sayfasına yüklendiğinde, dosya seçme alanını gizle
    useSpecialNotesStore().getNotes();
    if (this.reversedDates.length > 0) {
      this.selectedDate = this.reversedDates[0];
    }
  },
});
</script>

<style scoped>
.date-filters {
  margin-top: 20px;
}

.date-filters button {
  margin-right: 10px;
  background-color: #b6b2bb;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  box-shadow: 0px 5px 0px 0px rgb(58, 56, 63);
}

.date-filters button.active {
  background-color: #4400ff;
  color: #fff;
}
.special-notes {
  width: 80%;
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
.img-container {
  width: 100%;
  max-height: 200px; /* Set a maximum height */
  overflow: hidden;
  max-width: 300px;
  margin-bottom: 10px;
  aspect-ratio: 16 / 9; /* Or any aspect ratio you prefer */
}

.img {
  width: 100%; /* Set the width to fill its container */
  height: 100%; /* Let the height adjust according to aspect ratio */
  object-fit: contain; /* Ensure the image covers the entire container */
  border-radius: 10px;
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
