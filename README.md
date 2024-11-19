# Gera Certidao

Todas as certidões públicas emitidas num só lugar.

## Pré-requisitos

É necessário ter o mongo instalado e rodando antes de subir as aplicações.
Assim como, rodar a script ``insert-template.txt`` que cria os templates dos emails.


## Como instalar

```bash

cd app
npm install
cd ..

cd api
npm install
cd ..

cd scrapper
npm install
cd ..

```

## Como iniciar em desenvolvimento

Basta rodar os comandos abaixo.

```bash

cd app
npm run dev
cd ..

cd api
npm run dev
cd ..

cd scrapper
npm run dev
cd ..

```

## Como acessar

Para acessar, basta entrar na aplicação web entre no endereço: 
- https://localhost:3000/
