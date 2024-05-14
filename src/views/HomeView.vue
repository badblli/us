<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// Fonksiyon, tıklama olayını dinler ve /us sayfasına yönlendirme gerçekleştirir
const redirectToUsPage = () => {
  router.push("/us");
};

// State
const dataArr = ref([]);
const data = ref({
  greeting: "Merhaba ",
  name: "Sevgilim",
  greetingText: "Sana sevgilim diyebilmek benim için çok özel",
  wishText: "Umarım bir an önce resmi olarak 'KARIM' diyebilirim ;)",
  imagePath: "img/love.png",
  text1: "BUGÜN SENİN DOĞUM GÜNÜN :D",
  textInChatBox: "GÜNAYDIN DOĞUM GÜNÜ KIZI 👏🥳🎉🎁🥂🍻🪅🎂🐣👸",
  sendButtonLabel: "Gönder",
  text2: "Tabi ki bu kadar basit olmayacaktı.",
  text3: "Beklentini düşürüp sürpriz yapmak istedim.",
  text4: "İşte şu an karşında",
  text4Adjective: "Seni çok özel hissettirecek bir şey var.",
  text5Entry: "Çünkü,",
  text5Content: "Sen benim en özelimsin.",
  smiley: ":)",
  bigTextPart1: "🎂",
  bigTextPart2: "🎁",
  wishHeading: "İYİ Kİ DOĞDUN!",
  outroText: "Evet, şimdi bunu beğendiysen bi öpücüğünü alırım",
  replayText: "Ya da sen tekrar izlerken seni öpücüklere boğabilirim",
  outroSmiley: ":)",
});
// Methods
const fetchData = async () => {
  try {
    // const response = await fetch("../utils/customize.json");
    // const data = await response.json();
    dataArr.value = Object.keys(data.value);
    dataArr.value.map((customData) => {
      if (data[customData] !== "") {
        if (customData === "imagePath") {
          document
            .querySelector(`[data-node-name*="${customData}"]`)
            .setAttribute("src", data.value[customData]);
        } else {
          document.querySelector(
            `[data-node-name*="${customData}"]`
          ).innerText = data.value[customData];
        }
      }
    });
    animationTimeline(); // fetchData tamamlandığında animasyonu başlat
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)",
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// Lifecycle hook: fetchData işlevini bileşen oluşturulduğunda çağırın
onMounted(fetchData);
</script>

<template>
  <body>
    <div class="container">
      <div class="one">
        <h1 class="one">
          <span data-node-name="greeting">Hey</span>
          <span data-node-name="name">Lydia</span>
        </h1>
        <p class="two" data-node-name="greetingText">
          I really like your name btw!
        </p>
      </div>
      <div class="three">
        <p data-node-name="text1">It's your birthday!!! :D</p>
      </div>
      <div class="four">
        <div class="text-box">
          <p class="hbd-chatbox" data-node-name="textInChatBox">
            Happy birthday to you!! Yeee! Many many happy blah...
          </p>
          <p class="fake-btn" data-node-name="sendButtonLabel">Send</p>
        </div>
      </div>
      <div class="five">
        <p class="idea-1" data-node-name="text2">
          That's what I was going to do.
        </p>
        <p class="idea-2" data-node-name="text3">But then I stopped.</p>
        <p class="idea-3">
          <span data-node-name="text4"
            >I realised, I wanted to do something</span
          >
          <strong data-node-name="text4Adjective">special</strong>.
        </p>
        <p class="idea-4" data-node-name="text5Entry">Because,</p>
        <p class="idea-5">
          <span data-node-name="text5Content">You are Special</span>
          <span class="smiley" data-node-name="smiley">:)</span>
        </p>
        <p class="idea-6">
          <span data-node-name="bigTextPart1">S</span>
          <span data-node-name="bigTextPart2">O</span>
        </p>
      </div>
      <div class="six">
        <img
          src="/img/love.png"
          alt=""
          class="lydia-dp"
          data-node-name="imagePath"
        />
        <img src="/img/hat.svg" alt="" class="hat" />
        <div class="wish">
          <h3 class="wish-hbd" data-node-name="wishHeading">Happy Birthday!</h3>
          <h5 data-node-name="wishText">
            May the js.prototypes always be with you! ;)
          </h5>
        </div>
      </div>
      <div class="seven">
        <div class="baloons">
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon2.svg" alt="" />
          <img src="/img/ballon1.svg" alt="" />
          <img src="/img/ballon3.svg" alt="" />
        </div>
      </div>
      <div class="eight">
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" />
        </svg>
      </div>
      <div class="nine">
        <p data-node-name="outroText">
          Okay, now come back and tell me if you liked it.
        </p>
        <p id="replay" data-node-name="replayText">
          Or click, if you want to watch it again.
        </p>
        <p class="last-smile" data-node-name="outroSmiley">:)</p>
        <p @click="redirectToUsPage">Devam et 👀</p>
      </div>
    </div>
  </body>
</template>
