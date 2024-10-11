// /Users/takuya/Downloads/sublesson_0920-main 3/frontend/src/app/login/page.js
'use client';

// React の useState フックをインポート
import { useState } from 'react';

// Login コンポーネントをエクスポート
export default function Login() {
  // ユーザー名の状態と、それを更新する関数を定義
  const [username, setUsername] = useState('');
  // パスワードの状態と、それを更新する関数を定義
  const [password, setPassword] = useState('');
  // メッセージの状態と、それを更新する関数を定義
  const [message, setMessage] = useState('');
  // ログイン成功状態と、それを更新する関数を定義
  const [isSuccess, setIsSuccess] = useState(false);

  // ログインハンドラ関数を定義（非同期関数）
  const handleLogin = async () => {
    try {
      // /login エンドポイントに POST リクエストを送信
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ユーザー名とパスワードを JSON 形式で送信
        body: JSON.stringify({ username, password }),
      });
      // レスポンスの JSON を解析
      const data = await response.json();
      // レスポンスが OK (status 200-299) の場合
      if (response.ok) {
        setIsSuccess(true);
        setMessage('Success!');
      } else {
        // レスポンスが OK でない場合
        setIsSuccess(false);
        // サーバーからのメッセージまたはデフォルトメッセージを設定
        setMessage(data.message || '認証に失敗しました');
      }
    } catch (error) {
      // エラーが発生した場合
      setIsSuccess(false);
      setMessage('エラーが発生しました: ' + error.message);
    }
  };

  // コンポーネントの UI をレンダリング
  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      {/* メッセージを表示。成功時は緑、失敗時は赤で表示 */}
      <p style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>
    </div>
  );
}