## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [FAQs](#faqs)
### Información General
***
API en NodeJS para realizar la parte de backend de la app ElectroFinder
## Tecnologías
***
Lista de tecnologías usadas en el proyecto:
* [NodeJS](https://nodejs.org/en): Version 18.18.2
* [express](https://expressjs.com/): Version 4.19.2
* [docker](https://www.docker.com/)
* [mysql](https://www.mysql.com/): Version 8.3.0
## Instalación
***
Guia para la instalación del entorno local. 
```
$ git clone git@github.com:JesusDigon/NodeApi.git
$ cd NodeApi
$ npm install
$ docker compose up -d --build
$ npm run dev
```
Estos pasos se deben realizar solo la primera vez que se monta el proyecto en local. Después bastaría con lanzar ```docker compose up -d``` para arrancar el docker de la Base de Datos y ```npm run dev``` para arrancar el proyecto en local.

## FAQs
***
Preguntas frecuentes
1. **This is a question in bold**
Answer of the first question with _italic words_. 
2. __Second question in bold__ 
To answer this question we use an unordered list:
* First point
* Second Point
* Third point
3. **Third question in bold**
Answer of the third question with *italic words*.
4. **Fourth question in bold**
| Headline 1 in the tablehead | Headline 2 in the tablehead | Headline 3 in the tablehead |
|:--------------|:-------------:|--------------:|
| text-align left | text-align center | text-align right |