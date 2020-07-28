
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
let recorder, stream;


function download(chunks, fname="capture.mp4") {
  var blob = new Blob(chunks, {
    type: "video/mp4"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "capture.mp4";
  a.click();
  window.URL.revokeObjectURL(url);
}

async function startRecording() {
    stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            cursor: "always",
            mediaSource: "screen"
        }
    });
    recorder = new MediaRecorder(stream);

    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = e => {
        download(chunks);
    };

    recorder.start();
}


start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});


stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});

