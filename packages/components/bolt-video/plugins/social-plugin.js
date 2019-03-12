export const socialPlugin = player => {
  if (player.activePlugins_) {
    // In the current player, `player.activePlugins_.social` is always `true`, so these settings are never returned.
    // This check may be in place to avoid overwriting player configuration coming from Brightcove or Drupal.
    // TODO: verify this is the expected behavior.
    if (!player.activePlugins_.social) {
      return player.social({
        url: '',
        displayAfterVideo: true,
        services: {
          facebook: true,
          google: true,
          twitter: true,
          linkedin: true,
          pinterest: false,
          tumblr: false,
        },
      });
    }
  }
};
