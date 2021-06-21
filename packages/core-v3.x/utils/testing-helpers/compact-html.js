export function compactHtml(htmlStr) {
  return htmlStr.trim().replace(/>\s+</gm, `><`);
}
