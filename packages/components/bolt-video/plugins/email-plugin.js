export const emailPlugin = player => {
  if (player.activePlugins_) {
    if (
      !player.activePlugins_.emailSocialShare &&
      typeof emailSocialShare === "function"
    ) {
      return player.emailSocialShare();
    }
  }
};
