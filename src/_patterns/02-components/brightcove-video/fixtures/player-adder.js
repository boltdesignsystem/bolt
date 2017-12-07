/* eslint import/no-unresolved: "off" */

import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import Button from "./button";
import BrightcoveVideo from "../brightcove-player";

class VideoAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoCount: 0
    };
  }

  getVideos(count) {
    const videos = [];
    let i = 0;

    while (i < count) {
      videos.push(
        <BrightcoveVideo
          key={i}
          width={300}
          height={200}
          policyKey={this.props.policyKey}
          videoId={this.props.videoId}
          accountId={this.props.accountId}
        />
      );

      i += 1;
    }

    return <View>{videos}</View>;
  }

  render() {
    return (
      <View>
        {this.getVideos(this.state.videoCount)}
        <Button
          buttonText="click here to add a video"
          onPress={() => {
            this.setState({ videoCount: this.state.videoCount + 1 });
          }}
        />
      </View>
    );
  }
}

VideoAdder.propTypes = {
  videoId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  policyKey: PropTypes.string.isRequired
};

export default VideoAdder;
