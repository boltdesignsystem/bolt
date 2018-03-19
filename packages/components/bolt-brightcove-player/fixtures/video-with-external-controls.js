/* eslint import/no-unresolved: "off" */

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Button from './button';
import BrightcoveVideo from '../brightcove-video';

class VideoWithExternalControls extends Component {
  render() {
    return (
      <View>
        <BrightcoveVideo
          ref={(ref) => {
            this.bcVideo = ref;
          }}
          policyKey={this.props.policyKey}
          videoId={this.props.videoId}
          accountId={this.props.accountId}
        />
        <Button
          testID="external-play"
          buttonText="play"
          onPress={() => {
            this.bcVideo.play();
          }}
        />
        <Button
          testID="external-pause"
          buttonText="pause"
          onPress={() => {
            this.bcVideo.pause();
          }}
        />
        <Button
          testID="external-reset"
          buttonText="reset"
          onPress={() => {
            this.bcVideo.reset();
          }}
        />
      </View>
    );
  }
}

VideoWithExternalControls.propTypes = {
  videoId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  policyKey: PropTypes.string.isRequired,
};

export default VideoWithExternalControls;
