export default <Config>{
  blogTitle: 'LifeGadget',
  blogSubTitle: '生活をサポートする記事メディア',
  blogTitleTag: 'LifeGadget（ライフガジェット）',
  blogDomain: 'lifegadget.tokyo',
  blogLogoImage: 'lifegadget_white.png',
  blogDefaultImage: 'lifegadget.png',
  perPage: 12,
  twitter: '@lifegadgetme',
};

export interface Config {
  readonly blogTitle: string;
  readonly blogSubTitle: string;
  readonly blogTitleTag: string;
  readonly blogDomain: string;
  readonly blogLogoImage: string;
  readonly blogDefaultImage: string;
  readonly perPage: number;
  readonly twitter: string;
}
