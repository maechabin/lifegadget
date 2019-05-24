import Showdown from 'showdown';

export function createRawMarkup(content: string): { __html: string } {
  const converter = new Showdown.Converter();
  const markup = converter.makeHtml(content);
  return { __html: markup };
}
