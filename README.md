sample project

## Swagger Export Typescript

로컬 서버를 띄운 후, 대상이 될 URL을 획득합니다\
(swaggerURL 경로에 -yaml 추가가 필요합니다)

env.local에 swagger url 입력합니다

```
SWAGGER_URL=${swagger_url}
```

Swagger에 맞게 typescript를 export 합니다

```
pnpm run generate-api
```

## Keycloak 설정

Keycloak URL (dev: https://accounts.hqloud.blocksmith.xyz) 에서 렐름 생성<br />
boilerplate 용 렐름은 dev-keycloak-authentication <br />
환경변수 값 다음과 같이 세팅

```
KEYCLOAK_BASE_URL=https://accounts.hqloud.blocksmith.xyz/realms/{생성 렐름 이름}/protocol/openid-connect/token
KEYCLOAK_ISSUER=https://accounts.hqloud.blocksmith.xyz/realms/{생성 렐름 이름}
KEYCLOAK_CLIENT_ID=Keycloak 콘솔에서 Clients -> Settings -> ClientID
KEYCLOAK_SECRET=Keycloak 콘솔에서 Clients -> Credentials -> Client Secret
```

## Dockerize

빌드

```
docker build .  -t next-docker
```

도커 실행

```
docker run -dp 3000:3000 next-docker
```
