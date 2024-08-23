#!/usr/bin/env sh

# Store runtime environment variable temporarily
if [ -z "${APP_ENV}" ]; then
  echo "ERROR: APP_ENV is not defined. Exiting..."
  exit 1
fi

# Load .env files according to APP_ENV,  shut down if they do not exist
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
#secret=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --query SecretString --output text)
#eval "$(echo "$secret" | jq -r 'to_entries | .[] | "export \(.key)=\(.value)"')"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
HOSTNAME="0.0.0.0"

exec node server.js