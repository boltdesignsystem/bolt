export const emailPlugin = player => {
  if (player.activePlugins_) {
    if (
      !player.activePlugins_.emailSocialShare &&
      typeof player.emailSocialShare === "function"
    ) {
      return player.emailSocialShare();
    }
  }
};
