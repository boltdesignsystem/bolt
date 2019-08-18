export const emailPlugin = player => {
  if (player.activePlugins_) {
    if (!player.activePlugins_.emailSocialShare) {
      return player.emailSocialShare();
    }
  }
};
