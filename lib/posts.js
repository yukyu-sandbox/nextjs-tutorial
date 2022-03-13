import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
    console.log('--s----');
    console.log(matterResult.data);
    console.log('--end----');
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
