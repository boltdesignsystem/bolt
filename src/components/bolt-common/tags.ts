const Tags: Array<string> = [
  'div', 'a', 'button', 'h1', 'h2', 'h3', 'h4'
  // small: 'small',
  // medium: 'medium',
  // large: 'large',
  // xlarge: 'xlarge',
  // super: 'super'
];

export type Tag = typeof Tags;

export function getTag(tag: string) {
  return Tags.includes(tag) ? `${tag}` : 'p';
}
