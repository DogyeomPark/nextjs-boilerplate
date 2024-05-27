# 베이스 이미지 설정
FROM public.ecr.aws/docker/library/node:18-alpine AS base
WORKDIR /app

ARG BUILD_ENV

# pnpm 설치
RUN npm install -g pnpm@9.0.5

# 의존성 설치를 위한 스테이지
FROM base AS deps
RUN apk add --no-cache python3 make g++ && ln -sf python3 /usr/bin/python
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --store-dir .pnpm-store

# 빌드 스테이지
FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Make env files
RUN if [ -n "$BUILD_ENV" ]; then \
    yes | cp -f .env.$BUILD_ENV .env.production; \
  fi

RUN echo "$BUILD_ENV"

# 개발 의존성 제거
RUN pnpm run build
RUN pnpm prune --prod

# 최종 이미지
FROM base AS deploy
WORKDIR /app

# Secret Manager 사용 시
#RUN apk add --no-cache aws-cli jq

# 프로덕션 의존성 복사
COPY --from=builder /app/node_modules ./node_modules
# package.json 복사 (환경변수 등 설정 포함)
COPY --from=builder /app/package.json ./package.json
# 빌드된 .next 디렉토리 복사
COPY --from=builder /app/.next ./.next
# 기타
COPY --from=builder /app/.env.* ./
COPY --from=builder /app/entrypoint.sh ./

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["./entrypoint.sh"]