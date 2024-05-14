<script setup>
import { ref, computed, onMounted } from "vue";
import SpecialNotes from "../components/SpecialNotes.vue";

const calculateDuration = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();

  const diff = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

const startDate = "2024-04-19T00:00:00";
const duration = ref(calculateDuration(startDate));

const formattedDuration = computed(() => {
  return `${duration.value.days} gün ${duration.value.hours} saat ${duration.value.minutes} dakika ${duration.value.seconds} saniye`;
});

onMounted(() => {
  const image = document.querySelector(".img");
  let grayscaleValue = 100;
  const interval = setInterval(() => {
    grayscaleValue -= 10;
    if (grayscaleValue < 0) {
      clearInterval(interval);
    } else {
      image.style.filter = `grayscale(${grayscaleValue}%)`;
    }
  }, 200);

  setInterval(() => {
    duration.value = calculateDuration(startDate);
  }, 1000);
});
</script>

<template>
  <div class="aboutus">
    <img class="img" src="/img/us.jpg" alt="us" />
    <i>19.04.2024</i>
    <div class="calculate">
      <h4>{{ formattedDuration }}</h4>
      <span class="heart">💖</span>
    </div>
    <SpecialNotes />
  </div>
</template>

<style scoped>
.calculate {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

.img {
  width: 200px; /* Set the width */
  height: 200px; /* Set the height to create a square */
  object-fit: cover; /* Ensure the image covers the entire container */
  overflow: hidden; /* Hide any overflow beyond the container */
  filter: grayscale(100%); /* Convert the image to black and white */
  transition: filter 2s ease; /* Add a transition for a smooth effect */
}

.aboutus {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 100px;
}

.heart {
  font-size: xx-large;
  animation: heartbeat 1s infinite;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
