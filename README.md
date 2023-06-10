# \[React Burger\]

\[Build status badge\]

Курсовая работа на профессии [React-разработчик] (https://practicum.yandex.ru/react/) от Яндекс.Практикум.

## Технологии

- [React](https://reactjs.org/) SPA (одностраничное React приложение)
- Функциональные компоненты с [React Hooks] (https://ru.react.js.org/docs/hooks-reference.html)
- Маршрутизация [React Router v6](https://reactrouter.com/en/main)
- Управление состоянием [Redux](https://redux.js.org/)
- Статическая типизация [TypeScript] (https://www.typescriptlang.org/)
- Протокол [WebSocket] (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) для двусторонней связи с сервером 
- Модульное тестирование [Jest] (https://jestjs.io/)
- E2E тестирование [Cypress]

## Установка

1. Клонировать репозиторий и установить все зависимости 
```bash
npm install
```
2. Запустить приложение локально
```bash
npm start
```

## Доступные команды

* `npm start`: Запускает приложение локально в среде разработки, по умолчанию оно будет досупно по адресу http://localhost:3000.
* `npm run build`: Собирает приложение для продакшена в папку 'build'
* `npm test`: Запускает модульные тесты на Jest
* `npm run cypress:open`: Запускает e2e тесты на Cypress
* `npm run deploy`: Разворачивает приложение на выбранном удаленном сервере


## Развертывание
```bash
npm run deploy
```
Разворачивает приложение на сервере [Yandex.Cloud] (http://zyryanova.students.nomoredomains.rocks/)