export const uncolorize = (content: string): string =>
  content.replace(/\^([0-9])/g, '');

export const reset = (content: string): string =>
  uncolorize(content.toLowerCase());
