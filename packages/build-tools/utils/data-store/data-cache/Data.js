module.exports = class DataObject {

  constructor(value, previous) {
    this.value = value;
    this.previous = previous;
  }

  getFrames(filter) {
    const frames = [];

    let currentFrame = this;
    while (currentFrame) {
      if (!filter || filter(currentFrame)) {
        frames.push(currentFrame);
      }
      currentFrame = currentFrame.previous;
    }

    return frames.reverse();
  }

}
