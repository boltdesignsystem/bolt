# Times Component - Brightcove Video

# Native

## Getting started

* `yarn add @times-components/brightcove-video`
* `react-native link`

:warning: For native, the `policyKey` is required, see
[Brightcove's Policy API](https://docs.brightcove.com/en/video-cloud/policy-api/getting-started/api-overview.html)
for more details.

## Android requirement

To use this component, you need to upgrade your version of gradle. To do that:

Change your `android/build.gradle`:

```diff
buildscript {
    repositories {
        jcenter()
+        google()
    }
    dependencies {
-        classpath 'com.android.tools.build:gradle:2.2.3'
+        classpath 'com.android.tools.build:gradle:3.0.0-beta7'
        classpath 'com.google.gms:google-services:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```

and update the version of `gradlew` by changing one line in
`android/gradle/wrapper/gradle-wrapper.properties`:

```diff
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https://services.gradle.org/distributions/gradle-4.2-all.zip
- distributionUrl=https\://services.gradle.org/distributions/gradle-2.14.1-all.zip
+ distributionUrl=https://services.gradle.org/distributions/gradle-4.2-all.zip
```

## iOS Install of the Brightcove SDK

### Install with Cocoapods

Add the 2 following lines to the top of your `ios/Podfile`

```
source 'https://github.com/CocoaPods/Specs.git' # Add if you have other pods in your Podfile
source 'https://github.com/brightcove/BrightcoveSpecs.git'
```

and in your main Target, add :

```
pod 'Brightcove-Player-Core'
```

Then update your master repo to have the specs for Brightcove Player

```
pod repo update
```

### Install Manually

To install the Brightcove SDK, follow Brightcove's instructions found
[here](https://github.com/brightcove/brightcove-player-sdk-ios#manual). We
recommend using `v5.3.3`, however any recent version should be fine.

## Android install of the Brightcove SDK

Add the following line to your `android/app/build.gradle`

```
repositories {
   maven { url 'http://repo.brightcove.com/releases' }
}
```

## Props

Properties types are defined in `./brightcove-video.proptypes.js`

| Property name          | Property type     | Comment                                                                               |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `videoId`              | string (required) | ID of the Brightcove video                                                            |
| `accountId`            | string (required) | ID of the Brightcove account                                                          |
| `policyKey`            | string            | policy key (native only)                                                              |
| `playerId`             | string            | ID of the player (web only)                                                           |
| `width`                | number            | width of the player                                                                   |
| `height`               | number            | height of the player                                                                  |
| `poster`               | object            | poster [image source](https://facebook.github.io/react-native/docs/image.html#source) |
| `onError`              | function          | Handle errors                                                                         |
| `onPlay`               | function          | Handles play events                                                                   |
| `onPause`              | function          | Handles pause events                                                                  |
| `onProgress`           | function          | Handles progress events                                                               |
| `onFinish`             | function          | Handles video finish events                                                           |
| `onEnterFullscreen`    | function          | Handles video entering fullscreen (Android only)                                      |
| `onExitFullscreen`     | function          | Handles video exiting fullscreen (Android only)                                       |
| `autoplay`             | boolean           | Should the video autoplay? (default false)                                            |
| `directToFullscreen`   | boolean           | Should the video play directly in fullscreen? (default false) (Native only)           |
| `hideFullScreenButton` | boolean           | Should the full screen button be hidden? (default false)                              |
| `resetOnFinish`        | boolean           | Should the video reset to poster image when video finishes? (default false)           |

## Usage

```
import BrightcoveVideo from '@times-component/brightcove-video';

...

<BrightcoveVideo
    accountId={BRIGHTCOVE_ACCOUNT_ID}
    videoId={BRIGHTCOVE_ACCOUNT_ID}
    width={320}
    height={70}
    onError={console.error}
    policyKey={BRIGHTCOVE_POLICY_KEY} // Required for native
    autoplay={true}
/>
```
