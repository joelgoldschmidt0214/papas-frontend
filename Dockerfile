# ----- 1. ビルドステージ (Builder) -----
# ここでNext.jsのビルドを行い、最適化された成果物を作成する
FROM node:20-slim AS builder

WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm ci

# ソースコードをコピーして、プロダクションビルドを実行
COPY . .

# ↓↓↓↓ ここに2行追加します ↓↓↓↓
# ビルド引数として NEXT_PUBLIC_API_URL を定義
ARG NEXT_PUBLIC_API_URL
# npm run build が参照できるように、環境変数として設定
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 環境変数が必要なビルドの場合、ここで --build-arg を使って渡す
RUN npm run build


# ----- 2. 実行ステージ (Runner) -----
# ビルドステージで作成した成果物だけを使って、軽量な本番イメージを作成する
FROM node:20-slim AS runner

WORKDIR /app

# 実行に必要なファイルだけをビルドステージからコピーする
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Next.jsのプロダクションサーバーを起動する
# package.json の "start": "next start" を実行する
CMD ["npm", "start"]