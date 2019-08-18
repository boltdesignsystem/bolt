# `<bolt-video>` Testing Checklist

## Base Functionality
* `<bolt-video>` player shell initially renders as expected (ex. black background with `<video>` tag till Brightcove finished loading)
* Bolt video-embedded Brightcove player finishes loading and plays as expected
* Dynamically injected players load as expected 
* Multiple video players being loaded simultaneously on the same page all load as expected 
* Visually the player is responsive in width and fits the space available (ex. fills the card container when used in a card) while still retaining the video’s aspect ratio.

> This confirms <bolt-ratio> object being used together with the `<bolt-video>` is working as expected 

## Config Options Work As Expected
* Video meta title can be optionally enabled / disabled
* Video meta duration can be optionally enabled / disabled
* Video autoplay works as expected (in supporting browsers) - including with sound muted
* Video player controls can be optionally hidden 
* Video player can can optionally loop 

## Background Embedded Videos
* Background embedded video players grow to fill the containing `<bolt-band>` when toggled
* Close button shows up in the top right corner of the background-embedded video player when expanded
* Clicking or tapping on the close button when a background video is expanded will pause the video + collapse and hide the player (fades away)
* When expanded, background embedded videos will visually be layered over any other content inside the containing `<bolt-band>` (ie. modal-like behavior)

## Video Player Extendability

* Background embedded videos can be configured to use external plugins in the same way as inline video instances

### Speed Controls
* A single video player instance that specific an external Brightcove plugin config can be extended to use our custom video speed controls plugin
* Multiple statically loaded video player instances on the same page show speed controls when configured
* A single dynamically loaded video player instance (ex. dynamically injected via Get Smart Content) shows speed controls when configured
* Multiple dynamically loaded video player instances (ex. dynamically injected via Get Smart Content) on the same page will show speed controls when configured

### Share Plugin
* A single video player instance that specific an external Brightcove plugin config can be extended to use our custom social sharing / email option
* The email title and body text can be configured via props passed to the <bolt-video> component
* Multiple statically loaded video player instances on the same page show custom email share option when configured
* A single dynamically loaded video player instance (ex. dynamically injected via Get Smart Content) shows custom email share option when configured
* Multiple dynamically loaded video player instances (ex. dynamically injected via Get Smart Content) on the same page will show the custom email share option when configured
