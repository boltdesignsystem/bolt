// Dev Notes
// 1. <bolt-modal> will soon be deprecated. Use <dialog class="c-bolt-dialog"> instead.
//    Once <bolt-modal> is removed, update "modal" references to "dialog" to avoid confusion.
//    Also, rename "show" => "open", "hide" => "close".

var players = document.querySelectorAll('.c-base-video');
// EXTERNAL CONTROLS
// Button requires a "js-base-video-toggle" class (how the functionality will be hooked up)
// Button requires "data-video-target" attribute (this is how the video is targeted on click)
var externalControlButtons = document.querySelectorAll('.js-base-video-toggle');

var handleExternalButtonClick = e => {
  e.preventDefault();
  var videoTarget = videojs.getPlayer(e.currentTarget.dataset.videoTarget);
  var isPlaying = videoTarget.el_.classList.contains('vjs-playing');
  if (isPlaying) {
    videoTarget.pause();
  } else {
    videoTarget.play();
  }
};

for (var eb = 0; eb < externalControlButtons.length; eb++) {
  externalControlButtons[eb].addEventListener(
    'click',
    handleExternalButtonClick,
  );
}

var videoInit = thisPlayer => {
  thisPlayer.on('error', function(err) {
    this.errorReporting(this, err, this.ga().sendbeacon);
    // OPTIONS
    // data-custom-error-message (optional) [string]: Pass in a acustom message to be displayed on errors
    this.customError(this.getAttribute('data-custom-error-message'));
  });
  thisPlayer.ready(function() {
    // OPTIONS
    // data-playback-rates (optional) [array]: Sets the playback rates on the player controls
    if (this.el().dataset.playbackRates) {
      var playbackRateOptions = this.getAttribute(
        'data-playback-rates',
      ).replace(/(\[*\]*)/g, '');
      playbackRateOptions = playbackRateOptions.split(',');
      if (typeof thisPlayer.playbackRates === 'function') {
        var playbackRateOptionsClean = [];
        for (var o = 0; o < playbackRateOptions.length; o++) {
          playbackRateOptionsClean.push(parseFloat(playbackRateOptions[o], 10));
        }
        thisPlayer.playbackRates(playbackRateOptionsClean);
      } else {
        thisPlayer.controlBar.playbackRateMenuButton = thisPlayer.controlBar.addChild(
          'PlaybackRateMenuButton',
          {
            playbackRates: playbackRateOptions,
          },
          10,
        );
      }
    }
    // OPTIONS
    // data-default-resolution (optional) [string]: Adjusts the default resolution for the videos (ex. 720p)
    qualityOptions = {
      useResolutionLabels: true,
      defaultResolution: this.getAttribute('data-default-resolution') || '720p',
    };
    this.qualityMenu(qualityOptions);
    // OPTIONS
    // data-social-title (optional) [string]: CURRENT NOT BEING DISPLAYED
    // data-social-description (optional) [string]: Social Panel title
    // data-social-url (optional[default: the page url]) [string]: change the shared social url
    // data-social-facebook (optional [default: true]) [boolean]: Displays the Facebook button
    // data-social-twitter (optional [default: true]) [boolean]: Displays the Twitter button
    // data-social-tumblr (optional [default: false]) [boolean]: Displays the tumblr button
    // data-social-pinterest (optional [default: false]) [boolean]: Displays the Pinterest button
    // data-social-linkedin (optional [default: true]) [boolean]: Displays the Linkedin button
    socialOptions = {
      title: this.getAttribute('data-social-title') || 'Share This Video',
      description: 'Share This Video',
      url: this.getAttribute('data-social-url') || window.location.href,
      removeEmbed: true,
      services: {
        facebook: this.el_.hasAttribute('data-social-facebook') ? true : false,
        twitter: this.el_.hasAttribute('data-social-twitter') ? true : false,
        tumblr: this.el_.hasAttribute('data-social-tumblr') ? true : false,
        pinterest: this.el_.hasAttribute('data-social-pinterest')
          ? true
          : false,
        linkedin: this.el_.hasAttribute('data-social-linkedin') ? true : false,
      },
      displayAfterVideo: this.el_.classList.contains('vjs-controls-disabled')
        ? false
        : true,
      buttonParent: 'controlBar',
    };
    this.social(socialOptions);
    this.ga();
    // OPTIONS
    // data-social-email (required) [boolean]: option to display the email icon
    // data-email-videoid (required) [string]: Video ID
    // data-email-videotitle (required) [string]: Video email title
    // data-email-body (required) [string]: Video email body
    // data-email-subject (required) [string]: Video email subject line
    // data-email-videourl (optional) [string]: Video URL to share in email
    if (this.el_.classList.contains('vjs-controls-disabled')) {
      this.emailSocialShare(false);
    } else {
      this.emailSocialShare(true);
    }
    // Move the fullscreen button to the far right of the controlbar
    if (thisPlayer.controlBar.getChild('FullscreenToggle')) {
      var fullScreenButton = thisPlayer.controlBar.getChild('FullscreenToggle')
        .el_;
      thisPlayer.controlBar.el_.appendChild(fullScreenButton);
    }
    if (this.el_.classList.contains('c-base-video--audio-only')) {
      this.arrowNavigation();
    }
  });
  thisPlayer.on('loadstart', function(player) {
    // OPTIONS
    // data-media-title (optional [default: true]) [boolean]: hide the title
    // data-media-duration (optional [default: true]) [boolean]: hide the duration
    // data-media-preview (optional [default: false]) [boolean]: show the preview label
    this.metaData(
      this.el_.hasAttribute('data-media-title') ? this.mediainfo.name : '',
      this.el_.hasAttribute('data-media-duration')
        ? this.mediainfo.duration
        : '',
      this,
      this.el_.hasAttribute('data-media-preview') ? true : false,
    );
  });
  thisPlayer.on('loadedmetadata', function(player) {
    //OPTIONS
    // data-autoplay-on-viewport (optional [default: false]) [boolean]: will play the video when it comes into view
    // REQUIRES the "muted" attribute to be placed on the video-js
    if (this.el_.hasAttribute('data-autoplay-on-viewport') ? true : false) {
      this.autoplayOnViewport();
    }
  });
  thisPlayer.one('play', function(player) {
    // NOTE: Safari does not immediately load the closed captioning menu on load, need to first wait until the first play event + 1/2 second wait time to avoid race conditions
    window.setTimeout(
      function() {
        this.closeCaptioning();
      }.bind(this),
      500,
    );
  });
};

players.forEach(function(player) {
  // Initialize the player if it hasn't already been.
  var playerId = player.getAttribute('data-player');
  if (
    !player.classList.contains('bc-player-' + playerId + '_default') &&
    !player.hasAttribute('data-video-delayed')
  ) {
    bc(player);
  }

  // [data-video-modal] prevents the video from being loaded on page load
  if (!player.hasAttribute('data-video-delayed')) {
    const myPlayer = videojs.getPlayer(player.id);
    // Initialize the Brigthcove video functionality
    videoInit(myPlayer);
    // If this video is in a modal, it should ideally be using "data-video-delayed".
    // However, there are cases where that's overkill, like when there's only one or two
    // such videos on a page and the video isn't in a place where 'is_delayed' can be easily/reliably
    // added (such as in an advanced modal).
    const modal = player.closest('bolt-modal') || player.closest('dialog'); // [1]
    const handleModalHide = e => {
      if (myPlayer) {
        myPlayer.pause();
      }
    };
    if (modal) {
      modal.addEventListener('modal:hide', handleModalHide); // [1]
      modal.addEventListener('dialog:close', handleModalHide);
    }
  } else {
    // Find all videos that have the "data-video-modal" data attribute
    const videoModals = document.querySelectorAll(
      'video-js[data-video-delayed]',
    );
    videoModals.forEach(video => {
      // Find the closest dialog for each of the modal videos
      const modal = video.closest('bolt-modal') || video.closest('dialog'); // [1]
      if (modal) {
        let myPlayer;

        const handleModalShow = e => {
          if (video.hasAttribute('data-video-delayed')) {
            // Using the temporary data attribute ("data-modal..." attributes), create the Brightcove atttributes required for init
            video.setAttribute('data-account', video.dataset.delayedAccount);
            video.setAttribute('data-player', video.dataset.delayedPlayer);
            video.setAttribute('data-video-id', video.dataset.delayedVideoId);
            // Initialize thse Brightcove video
            myPlayer = bc(video);
            // Pass in the initialized video into the Pega custom videoInit function
            videoInit(myPlayer);
            //Remove the "data-video-modal"
            video.removeAttribute('data-video-delayed');
          }
          if (
            myPlayer &&
            !video.hasAttribute('data-video-delayed-no-autoplay')
          ) {
            myPlayer.play();
          }
        };

        const handleModalHide = e => {
          if (myPlayer) {
            // Pause the video automatically
            myPlayer.pause();
          }
        };

        // Target the modal's "modal:show" event (as defined in 'packages/components/bolt-modal/src/modal.js')
        modal.addEventListener('modal:show', handleModalShow); // [1]
        modal.addEventListener('modal:hide', handleModalHide); // [1]

        // Target the dialog's "dialog:open" event (as defined in 'packages/components/bolt-dialog/src/dialog.js')
        modal.addEventListener('dialog:open', handleModalShow);
        modal.addEventListener('dialog:close', handleModalHide);
      }
    });
  }
});
