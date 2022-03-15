import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  //ディレクトリのファイル一覧を取得
  const fileNames = fs.readdirSync(postsDirectory);

  //fileNameの配列の要素毎に処理を行う
  const allPostsData = fileNames.map((fileName) => {
    //拡張子を削除
    const id = fileName.replace(/\.md$/, '');

    //posts以下にある[fileName]へのパスを取得
    const fullPath = path.join(postsDirectory, fileName);

    //パスで指定したファイルのデータを読み取る
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    //YAMLの部分をgray-matterで解析する
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data, //...はスプレッド構文
    };
  });

  //日付でソート
  return allPostsData.sort(({ data: a }, { data: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

//posts以下にある.mdのファイル名をidとして全件取得する関数
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

//idからmdファイルのコンテンツを取得する関数
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
