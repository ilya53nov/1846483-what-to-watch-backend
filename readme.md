# Личный проект «Что посмотреть»

* Студент: [Илья Хицков](https://up.htmlacademy.ru/nodejs-api/1/user/1846483).
* Наставник: [Николай Думчев](https://htmlacademy.ru/profile/nikopol-fw).

## Переменные окружения


```
PORT=port                              - номер порта для запуска сервера
SALT=salt                              - соль
DB_HOST=host                           - хост базы данных
DB_USER=user                           - логин
DB_PASSWORD=password                   - пароль 
UPLOAD_DIRECTORY=upload_directory      - директория для загрузки файлов
JWT_SECRET=jwt_secret                  - секрет JSON WEB TOKEN
STATIC_DIRECTORY_PATH=static_directory - директория для статики
```

## Сценарии

В package.json предопределено несколько сценариев.

---
Скомпилировать проект
---
```
npm run compile
```

```
Создаст директорию dist и скомпилирует проект.
```
---
Удалить скомпилированный проект
---
```
npm run clean
```
```
Удаляет директорию dist. Используется перед компиляцией.
```

---
Собрать проект
---
```
npm run build
```
```
Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.
```
---
Проверить линтером
---
```
npm run lint
```
```
Запуск проверки проекта статическим анализатором кода ESLint.

Линтер проверяет файлы только внутри директории src.

Обратите внимание, при запуске данной команды, ошибки выводятся в терминал.
```
---
Запустить ts-модуль без компиляции
---
```
npm run ts -- <Путь к модулю с ts-кодом>
```
```
Пакет ts-node позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.
```
---
Запустить json-server
---
```
npm run mock:server
```
```
Пакет json-server позволяет поднять тестовый REST API интерфейс.
```
---
Запустить проект
---
```
npm start
```
```
В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.
```
---
Запустить CLI приложение
---
```
npm run cli
```
```
Запуск CLI приложения
```
---
Запустить проект в режиме разработки
---
```
npm run start:dev
```
```
Запустит проект в режиме разработки со сценарием nodemon - автоматический перезапуск приложения с подсветкой логов
```

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Запуск проекта


### 1. Запустите десктопное приложение Docker Desktop

### 2. Разверните базу данных MongoDB консольной командой в терминале:
```
docker-compose up
```

### 3. Запустите сценарий консольной командой в терминале:
```
npm start
```



## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).