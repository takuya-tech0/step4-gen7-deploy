// コンソールで実行してみよう
// fetch('http://127.0.0.1:5000/night')
//   .then(response => response.text())  // レスポンスをテキスト形式で取得
//   .then(data => {
//     console.log(data);  // 取得したテキストをコンソールに表示
//   });

// Reactをインポートします
import React from 'react';

// NightPage という非同期関数（コンポーネント）を定義し、他ページで使用できるようにエクスポートします
// asyncは、関数内で await を使用できることを示します。
export default async function NightPage() {

  // fetch 関数を使って指定した URL（Flask サーバー）にリクエストを送信します。
  // await は fetch の完了を待ち、結果を res に格納します
  const res = await fetch('http://127.0.0.1:5000/night'); 

  // await を使用して、テキストの取得が完了するまで待機します
  const data = await res.text();

  // 以下をレンダリングします
  return (
    <div>
      <h1>Flaskからのレスポンス</h1>
      <p>{data}</p>
    </div>
  );
}

