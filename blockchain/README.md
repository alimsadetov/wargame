# dequity-blockchain

## Getting started
Первоначальная настройка
```
git clone https://gitlab.itglobal.com/dequity/blockchain.git
cd dequity-blockchain
npm ci
```
## ENV переменные
- PORT
- ACCESS_SECRET
- USER_PROFILE_ROOT
- PRIVATE_KEY
- PUBLIC_KEY
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
Чтение env переменных происходит из .developmnet.env файла (пофиксить на .test.env)
```
npm run test
npm run test:api
```
## Health check
GET роут /health-check