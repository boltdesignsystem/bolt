const { Renderer } = require('../Renderer')

class WebComponentRenderer extends Renderer {

  constructor(backend, components) {
    super(backend)
    this.components = components
  }

  async start() {
    await Renderer.prototype.start.call(this)

    const window = await this.backend.getWindow()
    const promises = this.components.map(name =>
      window.customElements.whenDefined(name)
    );
    await Promise.all(promises);
  }

}

module.exports = {
  WebComponentRenderer,
}
