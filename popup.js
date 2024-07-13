document.addEventListener("DOMContentLoaded", function () {
  const volumeLabel = document.getElementById("volume-label");
  const volumeSlider = document.getElementById("volume-slider");
  const muteButton = document.getElementById("mute-button");
  const resetButton = document.getElementById("reset-button");
  // const tabsList = document.getElementById("tabs-list");

  function getVolume() {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs.length > 0) {
        browser.tabs.sendMessage(tabs[0].id, { action: "getVolume" }).then((response) => {
          if (response && response.volume !== undefined) {
            volumeSlider.value = response.volume;
            updateVolumeLabel(response.volume);
          }
        });
      }
    });
  }

  function setVolume(volume) {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs.length > 0) {
        // tabs.forEach((tab) => {
        //   browser.tabs.sendMessage(tab.id, { action: "setVolume", volume: volume });
        // });
        browser.tabs.sendMessage(tabs[0].id, { action: "setVolume", volume: volume });
        updateVolumeLabel(volume);
      }
    });
    // updateVolumeLabel(volume);
  }

  function updateVolumeLabel(volume) {
    volumeLabel.innerHTML = `<strong>Volume: ${volume}%</strong>`;
  }

  // function updateTabsList() {
  //   browser.tabs.query({ audible: true }).then((tabs) => {
  //     tabsList.innerHTML = "";
  //     tabs.forEach((tab) => {
  //       const tabElement = document.createElement("div");
  //       tabElement.textContent = tab.title;
  //       tabElement.addEventListener("click", () => {
  //         browser.tabs.update(tab.id, { active: true });
  //       });
  //       tabsList.appendChild(tabElement);
  //     });
  //   });
  // }

  volumeSlider.addEventListener("input", function () {
    setVolume(this.value);
  });

  muteButton.addEventListener("click", function () {
    setVolume(0);
    volumeSlider.value = 0;
  });

  resetButton.addEventListener("click", function () {
    setVolume(100);
    volumeSlider.value = 100;
  });

  // browser.tabs.onUpdated.addListener(updateTabsList);
  // browser.tabs.onRemoved.addListener(updateTabsList);
  browser.tabs.onActivated.addListener(getVolume);

  // updateTabsList();
  getVolume();
});
