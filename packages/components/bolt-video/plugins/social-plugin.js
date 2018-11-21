export const socialPlugin = player => {
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
};
