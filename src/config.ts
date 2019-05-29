export default <Config>{
  blogTitle: 'LifeGadget',
  blogSubTitle: '生活をサポートする記事メディア',
  blogTitleTag: 'LifeGadget（ライフガジェット）',
  blogDomain: 'lifegadget.tokyo',
  blogUrl: 'https://lifegadget.maechabin.mixh.jp/wp',
  blogLogoImage: 'lifegadget_white.png',
  blogDefaultImage: 'lifegadget.png',
  perPage: 12,
  twitter: '@lifegadgetme',
  analyticsCode: 'UA-100378023-1',
  adsenseCode: 'ca-pub-6331923403728737',
};

export interface Config {
  blogTitle: string;
  blogSubTitle: string;
  blogTitleTag: string;
  blogDomain: string;
  blogUrl: string;
  blogLogoImage: string;
  blogDefaultImage: string;
  perPage: number;
  twitter: string;
  analyticsCode: string;
  adsenseCode: string;
}
