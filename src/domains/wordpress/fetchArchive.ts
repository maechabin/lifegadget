import fetch from 'isomorphic-fetch';

require('dotenv').config();

/** 記事 */
export interface Archive {
  author: number;
  categories: number[];
  comment_status: string;
  content: {
    protected: boolean;
    rendered: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
    protected: boolean;
    rendered: string;
  };
  featured_media: number;
  format: string;
  guid: {
    rendered: string;
  };
  id: number;
  link: string;
  meta: any[];
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: {
    rendered: string;
  };
  type: string;
  _links: any;
}

/**
 * 記事データを取得する
 * @param articleId 取得する記事のID
 */
export async function fetchArchive(articleId: number): Promise<Archive | null> {
  /** リクエストパラメータ */
  const params = '?context=view';

  /** リクエストURL */
  const url = `${process.env.REACT_APP_API_URI}/wp-json/wp/v2/posts/${articleId}${params}`;

  return (
    fetch(url, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      // .then(ArchiveContainer.handleErrors)
      .then((res: Response) => {
        if (res.status === 200) {
          return res.json();
        }
        console.log(res);
        return null;
      })
      .catch((error) => {
        console.error(error);
        return null;
      })
  );
}
