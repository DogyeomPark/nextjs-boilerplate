#!/usr/bin/env sh

# APP_ENV가 정의되지 않은 경우 종료
if [ -z "${APP_ENV}" ]; then
  echo "ERROR: APP_ENV is not defined. Exiting..."
  exit 1
fi

# APP_ENV에 따라 .env 파일 로드, 해당 파일이 없을 경우 종료
if [ -f .env.${APP_ENV} ]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    if [[ "$line" == "" || "$line" == \#* ]]; then
      continue
    fi
    export "$line"
  done < .env.${APP_ENV}
else
  echo "ERROR: .env.${APP_ENV} file not found." 
  exit 1  
fi

# AWS Secret Manager에서 secret value 호출
secret=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --query SecretString --output text)
eval "$(echo "$secret" | jq -r 'to_entries | .[] | "export \(.key)=\(.value)"')"

pnpm build
exec pnpm start