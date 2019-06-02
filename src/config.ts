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
  blogTitle: string;
  blogSubTitle: string;
  blogTitleTag: string;
  blogDomain: string;
  blogLogoImage: string;
  blogDefaultImage: string;
  perPage: number;
  twitter: string;
}
