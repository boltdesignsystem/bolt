export default (Base = HTMLElement) => {
  class extends Base {
    renderer(root, render) {
      root.innerHTML = render();
    }
  }
}