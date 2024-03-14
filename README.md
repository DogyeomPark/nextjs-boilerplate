## Sample Components

boilerplate 내부의 component 및 page 등은 이해를 돕기 위한 코드입니다.

필요가 없거나 수정이 필요한 경우, 삭제 및 수정하셔도 무방합니다.

## Swagger Export Typescript

### `api-service.ts` 생성

로컬 서버를 띄운 후, 대상이 될 URL을 획득합니다\
(swaggerURL 경로에 -yaml 추가가 필요합니다)

`.env.***`에 swagger url 입력합니다

```
SWAGGER_URL=${swagger_url}
```

Swagger에 맞게 typescript를 export 합니다

```
pnpm run generate-api
```

`src/generated/api` 폴더 내부에 api 관련 로직이 포함된 `api-service.ts` 파일이 생성됩니다.

### `apiService.ts` 생성

위 과정 이후 `src/lib` 폴더 안에 아래의 코드를 포함한 `apiService.ts` 파일을 생성합니다.

```ts
import { Api } from '@/generated/api/api-service';

export const apiService = new Api({
  baseUrl: process.env.BASE_API_URL,
});
```

모든 api 호출 `apiService.ts` 를 import 한 후 사용하시면 되겠습니다.

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

관련하여 자세한 샘플 코드는 `feature/keycloak` 을 참고바랍니다.

## react-i18n 설정

### 번역 파일 생성

언어별 번역 정보를 담은 json 파일 생성합니다. (파일명은 예시입니다.)

```
.
└── project/
    └── locales/
        ├── en/
        │   ├── common.json
        │   ├── landing.json
        │   └── ...
        └── ko/
            ├── common.json
            ├── landing.json
            └── ...
```

### config 설정

```js
// i18n.config.js
const i18nConfig = {
  locales: ['en', 'ko', ... ],
  defaultLocale: 'en',
};

module.exports = i18nConfig;
```

관련하여 자세한 샘플 코드는 `feature/react-i18n` 을 참고바랍니다.

## Dockerize

빌드

```
docker build .  -t next-docker
```

도커 실행

```
docker run -dp 3000:3000 next-docker
```
