const button = document.getElementById("button");
const bubble = document.getElementById("advice");
const ID = document.getElementsByClassName("adviceID");

function renderAdvice(advice, adviceID) {
  bubble.textContent = advice;
  ID.textContent = adviceID;
}

async function getAdvices() {
  const url = "https://api.adviceslip.com/advice";

  let advice = "";
  let adviceID = "";

  try {
    const response = await fetch(url);
    const data = await response.json();

    advice = await data.slip.advice;
    adviceID = (await "ADVICE #") + data.slip.id;
  } catch (e) {
    console.log(e);
  }

  renderAdvice(advice, adviceID);

  tellMeAnAdvice(advice);
}

function tellMeAnAdvice(advice) {
  VoiceRSS.speech({
    key: "5ff4b1b6ab8143f488a977bc3a2f2a9c",
    src: advice,
    hl: "en-us",
    v: "Mike",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
button.addEventListener("click", getAdvices);
