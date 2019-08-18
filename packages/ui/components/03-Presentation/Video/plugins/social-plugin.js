export const socialPlugin = player => {
  if (player.activePlugins_) {
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
