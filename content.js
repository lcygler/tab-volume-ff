browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "getVolume":
      getVolume(sendResponse);
      break;
    case "setVolume":
      setVolume(request.volume, sendResponse);
      break;
    default:
      sendResponse({ success: false });
      break;
  }
  return true;
});

function getVolume(sendResponse) {
  const elements = document.querySelectorAll("audio, video");
  // const audioPlayer = await getAudioPlayer();

  // if (elements.length === 0 && audioPlayer) {
  //   console.log("getVolume audioPlayer volume: " + Math.round(audioPlayer.volume * 100));
  //   sendResponse({ volume: Math.round(audioPlayer.volume * 100) });
  //   return;
  // }

  if (elements.length > 0) {
    sendResponse({ volume: Math.round(elements[0].volume * 100) });
  } else {
    sendResponse({ volume: 100 });
  }
}

function setVolume(volume, sendResponse) {
  const elements = document.querySelectorAll("audio, video");
  // const audioPlayer = await getAudioPlayer(); 

  // if (elements.length === 0 && audioPlayer) {
  //   audioPlayer.volume = volume / 100;
  //   console.log("setVolume audioPlayer volume: " + volume / 100);
  //   sendResponse({ success: true });
  //   return;
  // }

  if (elements.length > 0) {
    elements.forEach((element) => {
      element.volume = volume / 100;
    });
    sendResponse({ success: true });
  } else {
    sendResponse({ success: false });
  }
}

// function getAudioPlayer() {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.textContent = `
//       document.dispatchEvent(new CustomEvent('GET_AUDIO_PLAYER', { detail: window.audioPlayer }));
//     `;
//     document.body.appendChild(script);
//     document.body.removeChild(script);

//     document.addEventListener(
//       "GET_AUDIO_PLAYER",
//       function (event) {
//         resolve(event.detail);
//       },
//       { once: true }
//     );
//   });
// }
