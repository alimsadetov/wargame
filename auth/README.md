# dequity-agencies

## Getting started
Первоначальная настройка
```
git clone https://gitlab.itglobal.com/dequity/auth.git
cd auth
npm ci
```
## ENV переменные
- PORT
- ACCESS_SECRET
- ACCESS_TOKEN_DURATION
- JWT_SECRET
- REFRESH_SECRET
- SALT_ROUNDS
- POSTGRES_HOST
- POSTGRES_PORT
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB
- EVERSCALE_ENDPOINT
## Запуск проекта
В режиме разработки:
Чтение env переменных происходит из .developmnet.env файла
```
npm run start:dev
```
В production:
Чтение env переменных происходит из .production.env файла
```
npm run build
npm run start
```
## Запуск тестов
Чтение env переменных происходит из .test.env файла
```
npm run test
npm run test:api
```
## Health check
GET роут /health-check