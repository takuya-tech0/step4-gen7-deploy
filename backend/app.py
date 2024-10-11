# flaskをインポートします
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

# Flaskアプリケーションのインスタンスを作成します
app = Flask(__name__)
# これによりすべてのルートでCORSが有効になります
CORS(app)

# ルートURLにアクセスがあった場合に実行される関数を定義します
@app.route('/')
def hello_world():
    return 'Hello, World!'

# /nightにアクセスがあった場合に実行される関数を定義します
@app.route('/night', methods=['GET'])
def hello_night_world():
    # GETメソッドで/nightにアクセスしてきたら、good nightと返答します
    if request.method == 'GET':
        return 'Good night!'
    else:
        return 'Method Not Allowed', 405

# /night/<id>にアクセスがあった場合に実行される関数を定義します
@app.route('/night/<id>', methods=['GET'])
def good_night(id):
    # GETメソッ ドで/night/idにアクセスしてきたら、idさん、「早く寝てね」と返答します
    if request.method == 'GET':
        return f'{id}さん、「早く寝てね」'
    else:
        return 'Method Not Allowed', 405

# Azure Database for MySQLへの接続設定
def get_db_connection():
    return mysql.connector.connect(
        host='tech0-gen-7-step4-studentwebapp-test.mysql.database.azure.com',  # Azure MySQLホスト名
        user='tech0gen7student',            # ユーザー名@ホスト名
        password='F4XyhpicGw6P',                        # パスワード
        database='legotest',                   # データベース名
        ssl_ca='/Users/takuya/Downloads/AzureMySQL_Connection/DigiCertGlobalRootCA.crt.pem'   # 証明書のパス
    )

# '/login'エンドポイントを定義し、POSTメソッドのみを許可します
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # データベース接続
    conn = get_db_connection()
    cursor = conn.cursor()

    # クエリでユーザー情報を取得
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()

    # データベース接続を閉じる
    cursor.close()
    conn.close()

    # 認証処理
    if user:
        return jsonify({'message': f'ようこそ！{username}さん'})
    else:
        return jsonify({'message': '認証失敗'}), 401

# アプリケーションを実行します
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)