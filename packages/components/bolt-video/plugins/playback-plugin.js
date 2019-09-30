export const playbackPlugin = player => {
  var options = {
    playbackRates: [1, 1.25, 1.5, 2],
  };

  if (Array.isArray(options.playbackRates)) {
    if (player.controlBar.playbackRateMenuButton) {
      // Update the existing playback rate menu button in the control bar
      var playbackControl = player.controlBar.playbackRateMenuButton;
      playbackControl.removeChild(playbackControl.menu);
      playbackControl.options_.playbackRates = options.playbackRates;
      playbackControl.addChild(playbackControl.createMenu());
      playbackControl.updateLabel();
      playbackControl.updateVisibility();
    } else {
      // Add the playback rate menu button to the control bar
      player.controlBar.playbackRateMenuButton = player.controlBar.addChild(
        'PlaybackRateMenuButton',
        {
          playbackRates: options.playbackRates,
        },
      );
      player.controlBar.playbackRateMenuButton.updateVisibility();
    }
  }
};
