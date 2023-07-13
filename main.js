var x = 0;
var y = 0;
var draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

var recognition = new SpeechRecognition();
recognition.continuous = true;

function start() {
  if (recognition.status !== "listening") {
    document.getElementById("status").innerHTML = "System is listening, please speak";
    recognition.start();
  } else {
    console.log("Recognition is already running.");
  }
}


recognition.onresult = function(event) {
  console.log(event);
  var content = event.results[0][0].transcript;
  var to_number = Number(content);

  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started drawing apple";
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "The speech has not recognized a number";
  }
}

function setup() {
  var screen_width = window.innerWidth;
  var screen_height = window.innerHeight;

  createCanvas(screen_width, screen_height - 150);
  canvas.style.position = "absolute";
  canvas.style.top = "150px";
  canvas.style.left = "0";
}

function draw() {
  if (draw_apple === "set") {
    for (var i = 1; i <= to_number; i++) {
      var x = Math.floor(Math.random() * 700);
      var y = Math.floor(Math.random() * 400);
      image(apple, x, y, apple.width, apple.height);
    }

    var speak_data = to_number + " Apples drawn";
    speak(speak_data);
  }
}

function speak(speak_data) {
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);

  speak_data = "Apples drawn";
  document.getElementById("status").innerHTML = to_number + " Apples drawn";
}

