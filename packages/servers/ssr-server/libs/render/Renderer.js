class Renderer {

  constructor(backend) {
    this.backend = backend
  }

  async start() {
    return await this.backend.start()
  }

  async render(html) {
    const window = await this.backend.getWindow(),
      body = window.document.querySelector('body')

    return new Promise(async (resolve, reject) => {
      const div = window.document.createElement('div');
      div.innerHTML = html;

      const scripts = div.getElementsByTagName('script');
      let i = scripts.length;
      while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
      }

      body.appendChild(div)

      return setTimeout(() => {resolve(div.innerHTML.replace(/<!---->/g, ''))}, 0)
    })
  }

}

module.exports = {
  Renderer,
}
